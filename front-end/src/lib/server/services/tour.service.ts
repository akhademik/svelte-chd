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
	 * Fetches single tour by localized slug with multi-layer cache.
	 */
	async getTourBySlug(slug: string, tourType?: string, kv?: KVNamespace): Promise<Tour | null> {
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
