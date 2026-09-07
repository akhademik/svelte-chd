import { cachedFetch } from '$lib/server/cache/memory-cache'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { sanityClient } from '$lib/server/sanity/client'
import { mapSanityToTour, mapSanityToTours } from '$lib/server/sanity/mappers/tour.mapper'
import {
	getSingleTourQuery,
	TOURS_BY_DAY_QUERY,
	TOURS_BY_HIGHLAND_QUERY,
} from '$lib/server/sanity/queries/tours'
import type { Tour } from '$lib/types/tour.type'

import { slugify } from '$lib/utils/format-data'
import { get_tour_slug } from '$lib/utils/sanity'

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
	const rawTourId = (tour.tour_id || '').toLowerCase().trim()

	// 1. Direct match with tour_id (e.g. "dl-01" or "chd-dt-01")
	if (rawTourId && rawTourId === target) return true

	// 2. Direct match with virtual slugs (format `{tour_id}-{slug}` or `{slug}`)
	const vVi = get_tour_slug(tour, 'vi').toLowerCase()
	const vEn = get_tour_slug(tour, 'en').toLowerCase()
	const vFr = get_tour_slug(tour, 'fr').toLowerCase()

	if (vVi === target || vEn === target || vFr === target) return true

	// 3. Match with raw name slugify without prefix (fallback for pure title slugs)
	const nameVi = slugify(tour.tour_name?.vi || tour.tour_name?.vn)
	const nameEn = slugify(tour.tour_name?.en)
	const nameFr = slugify(tour.tour_name?.fr)

	if (nameVi === target || nameEn === target || nameFr === target) return true

	// 4. If target slug starts with tour_id prefix, check if prefix matches tour_id
	if (rawTourId && target.startsWith(`${rawTourId}-`)) {
		return true
	}

	// 5. Check if numeric suffix of tour_id matches (e.g., target "dl-1-..." vs rawTourId "dl-01")
	if (rawTourId) {
		const rawNormalized = rawTourId.replace(/[^a-z0-9]/g, '')
		const targetPrefix = target.split('-')[0] + (target.split('-')[1] || '')
		if (rawNormalized && targetPrefix.startsWith(rawNormalized)) {
			return true
		}
	}

	return false
}

export const TourService = {
	/**
	 * Fetches tours by category ('day-tours' or 'highland-tours') with multi-layer cache.
	 */
	async getToursByType(tourType: TourType, kv?: KVNamespace): Promise<Tour[]> {
		return cachedFetch(`tours-${tourType}`, 5 * 60 * 1000, async () => {
			return withKvSnapshot(
				kv,
				`snapshot:tours:${tourType}`,
				async () => {
					const query = tourType === 'day-tours' ? TOURS_BY_DAY_QUERY : TOURS_BY_HIGHLAND_QUERY
					const rawData: any[] = await sanityClient.fetch(query)
					return mapSanityToTours(rawData || [])
				},
				data => Array.isArray(data) // Empty array [] is a valid result
			)
		})
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
		return cachedFetch(`tour-${tourType || 'all'}-${slug}`, 5 * 60 * 1000, async () => {
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
					const res = await sanityClient.fetch(query, { slug })
					return res ? mapSanityToTour(res) : null
				},
				data => data !== undefined && data !== null
			)
		})
	},
}
