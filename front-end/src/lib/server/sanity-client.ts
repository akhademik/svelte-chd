import { dev } from '$app/environment'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { VITE_SANITY_ID } from '$env/static/private'
import type { BlogPost } from '$lib/types/blog.type'
import type { Tour } from '$lib/types/tour.type'
import { type ClientConfig, createClient } from '@sanity/client'

const sanityConfig: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

export const sanityClient = createClient(sanityConfig)

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

export const EXTRACT_TOUR_FIELDS = `
	"best_sell": coalesce(best_sell, bestSellerTour, bestSell, false),
	"tour_highlights": coalesce(
		tour_highlights[]->{'highlights': coalesce(tour_highlights, highlights)},
		tourHighlights[]->{'highlights': coalesce(tour_highlights, tourHighlights, highlights)},
		[]
	),
	"tour_itinerary": coalesce(tour_itinerary, tourItinerary),
	"tour_includes": coalesce(tour_includes->tour_includes, tourIncludes->tourIncludes, tour_includes->includes, []),
	"tour_tags": coalesce(
		tour_tags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		tourTags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		[]
	),
	"tour_price": coalesce(tour_price, tourPrice),
	"tour_id": coalesce(tour_id, tourId, ''),
	"img_tour": coalesce(
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"img_cover": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgCover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"tour_duration": coalesce(tour_duration, tourDuration),
	"tour_slug": coalesce(tour_slug, tourSlug),
	"tour_intro": coalesce(tour_intro, tourIntro),
	"tour_name": coalesce(tour_name, tourName)
`

export const EXTRACT_BLOG_FIELDS = `
	_id,
	"title": coalesce(title, {}),
	"slug": coalesce(slug, {}),
	"category": coalesce(category, 'story'),
	"excerpt": coalesce(excerpt, {}),
	"coverImg": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"img_tour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"content": coalesce(content, {}),
	"isFeatured": coalesce(isFeatured, false),
	"publishedAt": coalesce(publishedAt, _createdAt),
	"author": coalesce(author, 'CHD Travel Team')
`

export const fetchToursByType = async (tourType: string): Promise<Tour[]> => {
	return cachedFetch(`tours-${tourType}`, 5 * 60 * 1000, async () => {
		try {
			if (tourType === 'day-tours') {
				return await sanityClient.fetch(
					`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']]{${EXTRACT_TOUR_FIELDS}}`
				)
			} else if (tourType === 'highland-tours') {
				return await sanityClient.fetch(
					`*[_type in ['highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`
				)
			} else if (['tourDaily', 'tourCentral', 'day_tours', 'highland_tours'].includes(tourType)) {
				return await sanityClient.fetch(`*[_type == $dbName]{${EXTRACT_TOUR_FIELDS}}`, {
					dbName: tourType,
				})
			}
			return await sanityClient.fetch(
				`*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`
			)
		} catch (error) {
			console.error(`[Sanity Server fetchToursByType error (${tourType})]:`, error)
			return []
		}
	})
}

export const fetchSingleTourBySlug = async (
	slug: string,
	tourType?: string
): Promise<Tour | null> => {
	return cachedFetch(`tour-${tourType || 'all'}-${slug}`, 5 * 60 * 1000, async () => {
		try {
			const typeFilter =
				tourType === 'day-tours'
					? `_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']`
					: tourType === 'highland-tours'
						? `_type in ['highland-tours', 'tourCentral', 'highland_tours']`
						: `_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']`

			const query = `*[(${typeFilter}) && (
				tour_slug.current == $slug ||
				tourSlug.current == $slug ||
				tour_slug.en.current == $slug ||
				tour_slug.vn.current == $slug ||
				tour_slug.fr.current == $slug ||
				tourSlug.en.current == $slug ||
				tourSlug.vn.current == $slug ||
				tourSlug.fr.current == $slug
			)][0]{${EXTRACT_TOUR_FIELDS}}`

			const res = await sanityClient.fetch(query, { slug })
			return res || null
		} catch (error) {
			console.error(`[Sanity Server fetchSingleTourBySlug error (${slug})]:`, error)
			return null
		}
	})
}

export const fetchFeaturedBlogs = async (): Promise<BlogPost[]> => {
	return cachedFetch('featured-blogs', 5 * 60 * 1000, async () => {
		try {
			let posts: BlogPost[] = await sanityClient.fetch(
				`*[_type == 'blogPost' && isFeatured == true] | order(publishedAt desc, _createdAt desc)[0...6]{${EXTRACT_BLOG_FIELDS}}`
			)
			if (!posts || posts.length === 0) {
				posts = await sanityClient.fetch(
					`*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc)[0...3]{${EXTRACT_BLOG_FIELDS}}`
				)
			}
			return posts || []
		} catch (err) {
			console.warn('[Sanity Server fetchFeaturedBlogs error]:', err)
			return []
		}
	})
}

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
	return cachedFetch('all-blogs', 5 * 60 * 1000, async () => {
		try {
			return await sanityClient.fetch(
				`*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc){${EXTRACT_BLOG_FIELDS}}`
			)
		} catch (err) {
			console.warn('[Sanity Server fetchAllBlogs error]:', err)
			return []
		}
	})
}

export interface ExchangeRatesData {
	USD: number
	EUR: number
	date?: string
}

export const fetchLatestExchangeRates = async (): Promise<ExchangeRatesData> => {
	const defaultRates: ExchangeRatesData = { ...DEFAULT_EXCHANGE_RATES }
	return cachedFetch('latest-exchange-rates', 60 * 60 * 1000, async () => {
		try {
			const doc = await sanityClient.fetch(
				`*[_type == 'exchangeRates'] | order(exchangeDate desc, _updatedAt desc)[0]{exchangeDate, rates}`
			)
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
			console.warn('[fetchLatestExchangeRates] rate ngoài khoảng hợp lệ, dùng default:', {
				usd,
				eur,
			})
			return defaultRates
		} catch (err) {
			console.warn('[Sanity Server fetchLatestExchangeRates error]:', err)
			return defaultRates
		}
	})
}
