import { dev } from '$app/environment'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { VITE_SANITY_ID } from '$env/static/private'
import type { BlogPost } from '$lib/types/blog.type'
import type { Tour } from '$lib/types/tour.type'
import { Logger } from '$lib/utils/logger'
import { type ClientConfig, createClient } from '@sanity/client'
import { mapSanityToBlogPosts } from './sanity/mappers/blog.mapper'
import { mapSanityToTour, mapSanityToTours } from './sanity/mappers/tour.mapper'
import {
	ALL_BLOGS_QUERY,
	EXCHANGE_RATES_QUERY,
	EXTRACT_BLOG_FIELDS,
	FALLBACK_BLOGS_QUERY,
	FEATURED_BLOGS_QUERY,
} from './sanity/queries/blogs'
import {
	EXTRACT_TOUR_FIELDS,
	getSingleTourQuery,
	TOURS_BY_DAY_QUERY,
	TOURS_BY_HIGHLAND_QUERY,
} from './sanity/queries/tours'

export { EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS }

const sanityConfig: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

export const sanityClient = createClient(sanityConfig)

export type TourType = 'day-tours' | 'highland-tours'

// In-memory cache for Worker isolates (extra defense layer)
const memoryCache = new Map<string, { data: any; expires: number }>()

export async function cachedFetch<T>(
	key: string,
	ttlMs: number,
	fetcher: () => Promise<T>
): Promise<T> {
	if (dev) {
		return fetcher()
	}
	const now = Date.now()
	const hit = memoryCache.get(key)
	if (hit && hit.expires > now) {
		return hit.data as T
	}
	const data = await fetcher()
	memoryCache.set(key, { data, expires: now + ttlMs })
	return data
}

export async function withKvSnapshot<T>(
	kv: KVNamespace | undefined,
	snapshotKey: string,
	fetcher: () => Promise<T>,
	isValidResult: (data: T) => boolean = () => true,
	ttlSeconds: number = 60 * 60 * 24 * 14 // 14 days default for disaster recovery
): Promise<T> {
	try {
		const fresh = await fetcher()
		if (isValidResult(fresh)) {
			if (kv) {
				// Write snapshot in background with TTL, don't block response, don't throw if KV fails
				kv.put(snapshotKey, JSON.stringify(fresh), {
					expirationTtl: ttlSeconds,
				}).catch((err: unknown) =>
					Logger.warn('SanityKV', `Snapshot write failed for ${snapshotKey}:`, err)
				)
			}
			return fresh
		}
		throw new Error(`Validation failed for ${snapshotKey}, attempting snapshot fallback`)
	} catch (err) {
		Logger.warn('SanityKV', `Sanity fetch failed, trying KV snapshot for ${snapshotKey}:`, err)
		if (kv) {
			const cached = await kv.get(snapshotKey)
			if (cached) {
				Logger.info('SanityKV', `KV snapshot HIT: ${snapshotKey}`)
				return JSON.parse(cached) as T
			}
		}
		Logger.error('SanityKV', `KV snapshot MISS, no fallback available: ${snapshotKey}`)
		throw err
	}
}

export const fetchToursByType = async (tourType: TourType, kv?: KVNamespace): Promise<Tour[]> => {
	return cachedFetch(`tours-${tourType}`, 5 * 60 * 1000, async () => {
		return withKvSnapshot(
			kv,
			`snapshot:tours:${tourType}`,
			async () => {
				const query = tourType === 'day-tours' ? TOURS_BY_DAY_QUERY : TOURS_BY_HIGHLAND_QUERY
				const rawData: any[] = await sanityClient.fetch(query)
				return mapSanityToTours(rawData || [])
			},
			data => Array.isArray(data) // Empty array [] is a valid result (e.g. all tours intentionally deleted)
		)
	})
}

export const fetchSingleTourBySlug = async (
	slug: string,
	tourType?: string,
	kv?: KVNamespace
): Promise<Tour | null> => {
	return cachedFetch(`tour-${tourType || 'all'}-${slug}`, 5 * 60 * 1000, async () => {
		return withKvSnapshot(
			kv,
			`snapshot:tour:${tourType || 'all'}:${slug}`,
			async () => {
				const typeFilter =
					tourType === 'day-tours'
						? `_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']`
						: tourType === 'highland-tours'
							? `_type in ['highland-tours', 'tourCentral', 'highland_tours']`
							: `_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']`

				const query = getSingleTourQuery(typeFilter)
				const res = await sanityClient.fetch(query, { slug })
				return res ? mapSanityToTour(res) : null
			},
			data => data !== undefined && data !== null
		)
	})
}

export const fetchFeaturedBlogs = async (kv?: KVNamespace): Promise<BlogPost[]> => {
	return cachedFetch('featured-blogs', 5 * 60 * 1000, async () => {
		return withKvSnapshot(
			kv,
			'snapshot:featured-blogs',
			async () => {
				let posts: any[] = await sanityClient.fetch(FEATURED_BLOGS_QUERY)
				if (!posts || posts.length === 0) {
					posts = await sanityClient.fetch(FALLBACK_BLOGS_QUERY)
				}
				return mapSanityToBlogPosts(posts || [])
			},
			data => Array.isArray(data)
		)
	})
}

export const fetchAllBlogs = async (kv?: KVNamespace): Promise<BlogPost[]> => {
	return cachedFetch('all-blogs', 5 * 60 * 1000, async () => {
		return withKvSnapshot(
			kv,
			'snapshot:all-blogs',
			async () => {
				const raw = await sanityClient.fetch(ALL_BLOGS_QUERY)
				return mapSanityToBlogPosts(raw || [])
			},
			data => Array.isArray(data)
		)
	})
}

export interface ExchangeRatesData {
	USD: number
	EUR: number
	date?: string
}

export const fetchLatestExchangeRates = async (kv?: KVNamespace): Promise<ExchangeRatesData> => {
	const defaultRates: ExchangeRatesData = { ...DEFAULT_EXCHANGE_RATES }
	return cachedFetch('latest-exchange-rates', 60 * 60 * 1000, async () => {
		try {
			return await withKvSnapshot(
				kv,
				'snapshot:exchange-rates',
				async () => {
					const doc = await sanityClient.fetch(EXCHANGE_RATES_QUERY)
					const usd = doc?.rates?.rateUSD
					const eur = doc?.rates?.rateEUR
					const isValid = (n: number) => typeof n === 'number' && n > 1000 && n < 100000

					if (isValid(usd) && isValid(eur)) {
						return {
							USD: 1 / usd,
							EUR: 1 / eur,
							date: doc.exchangeDate || undefined,
						}
					}
					throw new Error('Exchange rates out of valid range')
				},
				data => Boolean(data && data.USD && data.EUR)
			)
		} catch (err) {
			Logger.warn(
				'ExchangeRates',
				'[Sanity Server fetchLatestExchangeRates error, using defaultRates]:',
				err
			)
			return defaultRates
		}
	})
}
