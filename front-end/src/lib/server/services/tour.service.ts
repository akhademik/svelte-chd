import { CACHE_POLICY } from '$lib/server/cache/cache-policy'
import { cachedFetch } from '$lib/server/cache/memory-cache'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { sanityClient } from '$lib/server/sanity/client'
import {
	mapSanityToTour,
	mapSanityToTours,
	type SanityTourRaw,
} from '$lib/server/sanity/mappers/tour.mapper'
import {
	getSingleTourQuery,
	TOURS_BY_DAY_QUERY,
	TOURS_BY_HIGHLAND_QUERY,
} from '$lib/server/sanity/queries/tours'
import type { Tour } from '$lib/types/tour.type'

import { slugify } from '$lib/utils/format-data'
import { getTourSlug } from '$lib/utils/slug'

export type TourType = 'day-tours' | 'highland-tours'

/**
 * Checks if a tour matches a target slug string.
 * Supports:
 * - Hybrid format `{tour_id}-{nameSlug}` (e.g. `dl-01-kham-pha-ho-lak` or `hl-02-con-duong-xanh`)
 * - Pure virtual name slug across all locales (`vi`, `en`, `fr`)
 * - Raw `tour_id` (e.g. `dl-01`, `dl-1`, `hl-02`)
 * - Legacy `tour_slug` Sanity field
 */
export const matchesTourSlug = (tour: Tour, targetSlug: string): boolean => {
	if (!tour || !targetSlug) return false

	const target = targetSlug.toLowerCase().trim()
	const rawTourId = (tour.tourId ?? '').toLowerCase().trim()

	// 1. Direct match with tourId (e.g. "dl-01" or "chd-dt-01")
	if (rawTourId && rawTourId === target) return true

	// 2. Direct match with virtual slugs (format `{tourId}-{slug}` or `{slug}`) across all supported locales
	const vVi = getTourSlug(tour, 'vi').toLowerCase()
	const vEn = getTourSlug(tour, 'en').toLowerCase()
	const vFr = getTourSlug(tour, 'fr').toLowerCase()

	if (vVi === target || vEn === target || vFr === target) return true

	// 3. Match with raw name slug without prefix (fallback for pure title slugs)
	const nameVi = slugify(tour.tourName?.vi || tour.tourName?.vn)
	const nameEn = slugify(tour.tourName?.en)
	const nameFr = slugify(tour.tourName?.fr)

	if (nameVi === target || nameEn === target || nameFr === target) return true

	// 4. If target slug starts with tourId prefix (e.g. "dl-01-...")
	if (rawTourId && target.startsWith(`${rawTourId}-`)) {
		return true
	}

	return false
}

export const TourService = {
	/**
	 * Fetches tours by category ('day-tours' or 'highland-tours') with multi-layer cache.
	 */
	async getToursByType(tourType: TourType, kv?: KVNamespace): Promise<Tour[]> {
		return cachedFetch(`tours-${tourType}`, CACHE_POLICY.TOURS_TTL_MS, async () => {
			return withKvSnapshot(
				kv,
				`snapshot:tours:${tourType}`,
				async () => {
					const query = tourType === 'day-tours' ? TOURS_BY_DAY_QUERY : TOURS_BY_HIGHLAND_QUERY
					const rawData = await sanityClient.fetch<SanityTourRaw[]>(query)
					return mapSanityToTours(rawData || [])
				},
				data => Array.isArray(data) // Empty array [] is a valid result
			)
		})
	},

	/**
	 * Fetches all tours across all categories ('day-tours' and 'highland-tours').
	 */
	async getAllTours(kv?: KVNamespace): Promise<Tour[]> {
		const [dayTours, highlandTours] = await Promise.all([
			this.getToursByType('day-tours', kv),
			this.getToursByType('highland-tours', kv),
		])
		return [...dayTours, ...highlandTours]
	},

	/**
	 * Fetches single tour by localized slug with multi-layer cache and virtual slug matching.
	 */
	async getTourBySlug(slug: string, tourType?: TourType, kv?: KVNamespace): Promise<Tour | null> {
		const targetSlug = slug.toLowerCase().trim()

		// 1. If category is specified, search within that category's tours first
		if (tourType) {
			const categoryTours = await this.getToursByType(tourType, kv)
			const matched = categoryTours.find(t => matchesTourSlug(t, targetSlug))
			if (matched) return matched
		}

		// 2. If not found in specified category or category omitted, search across both categories
		const [dayTours, highlandTours] = await Promise.all([
			this.getToursByType('day-tours', kv),
			this.getToursByType('highland-tours', kv),
		])
		const allTours = [...dayTours, ...highlandTours]

		const matched = allTours.find(t => matchesTourSlug(t, targetSlug))
		if (matched) return matched

		// 3. Last fallback: Direct Sanity GROQ fetch (supports old documents with raw tourSlug)
		return cachedFetch(`tour-${tourType || 'all'}-${slug}`, CACHE_POLICY.TOURS_TTL_MS, async () => {
			return withKvSnapshot(
				kv,
				`snapshot:tour:${tourType || 'all'}:${slug}`,
				async () => {
					const typeFilter =
						tourType === 'day-tours'
							? `_type == 'tourDaily'`
							: tourType === 'highland-tours'
								? `_type == 'tourCentral'`
								: `_type in ['tourDaily', 'tourCentral']`

					const query = getSingleTourQuery(typeFilter)
					const res = await sanityClient.fetch<SanityTourRaw | null>(query, { slug })
					return res ? mapSanityToTour(res) : null
				},
				data => data !== undefined && data !== null
			)
		})
	},
}
