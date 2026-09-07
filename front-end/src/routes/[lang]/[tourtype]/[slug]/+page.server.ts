import { TourService, type TourType } from '$lib/server/services/tour.service'
import type { Tour } from '$lib/types/tour.type'
import { Logger } from '$lib/utils/logger'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { tourtype, slug } = params

	if (!tourtype || !slug || !['day-tours', 'highland-tours'].includes(tourtype)) {
		throw error(404, 'Tour not found')
	}

	const validTourType = tourtype as TourType

	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200, stale-if-error=604800',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV

	let tour: Tour | null = null
	let allCategoryTours: Tour[] = []

	try {
		;[tour, allCategoryTours] = await Promise.all([
			TourService.getTourBySlug(slug, validTourType, kv),
			TourService.getToursByType(validTourType, kv),
		])
	} catch (err) {
		Logger.error('TourDetailLoad', 'Total failure, no snapshot available:', err)
		throw error(503, 'Tạm thời không thể tải dữ liệu tour, vui lòng thử lại sau ít phút.')
	}

	if (!tour) {
		throw error(404, 'Tour not found')
	}

	return {
		tourtype,
		slug,
		tour,
		allCategoryTours,
	}
}
