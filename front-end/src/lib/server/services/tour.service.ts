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
			const matched = categoryTours.find(t => {
				const vVi = get_tour_slug(t, 'vi')
				const vEn = get_tour_slug(t, 'en')
				const vFr = get_tour_slug(t, 'fr')
				const nameVi = slugify(t.tour_name?.vi || t.tour_name?.vn)
				const nameEn = slugify(t.tour_name?.en)
				const nameFr = slugify(t.tour_name?.fr)
				const tourId = (t.tour_id || '').toLowerCase()

				return (
					vVi === targetSlug ||
					vEn === targetSlug ||
					vFr === targetSlug ||
					nameVi === targetSlug ||
					nameEn === targetSlug ||
					nameFr === targetSlug ||
					tourId === targetSlug
				)
			})
			if (matched) return matched
		}

		// 2. If not found in specified category or category omitted, search across both categories
		const [dayTours, highlandTours] = await Promise.all([
			this.getToursByType('day-tours', kv),
			this.getToursByType('highland-tours', kv),
		])
		const allTours = [...dayTours, ...highlandTours]

		const matched = allTours.find(t => {
			const vVi = get_tour_slug(t, 'vi')
			const vEn = get_tour_slug(t, 'en')
			const vFr = get_tour_slug(t, 'fr')
			const nameVi = slugify(t.tour_name?.vi || t.tour_name?.vn)
			const nameEn = slugify(t.tour_name?.en)
			const nameFr = slugify(t.tour_name?.fr)
			const tourId = (t.tour_id || '').toLowerCase()

			return (
				vVi === targetSlug ||
				vEn === targetSlug ||
				vFr === targetSlug ||
				nameVi === targetSlug ||
				nameEn === targetSlug ||
				nameFr === targetSlug ||
				tourId === targetSlug
			)
		})

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
