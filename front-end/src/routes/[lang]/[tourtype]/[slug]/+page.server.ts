import { TourService } from '$lib/server/services/tour.service'
import type { Tour } from '$lib/types/tour.type'
import { resolve_canonical_category } from '$lib/utils/format-data'
import { Logger } from '$lib/utils/logger'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { tourtype, slug } = params

	const canonicalCategory = resolve_canonical_category(tourtype)

	if (!canonicalCategory || !slug) {
		throw error(404, 'Tour not found')
	}

	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200, stale-if-error=604800',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV

	let tour: Tour | null = null
	let allCategoryTours: Tour[] = []

	try {
		;[tour, allCategoryTours] = await Promise.all([
			TourService.getTourBySlug(slug, canonicalCategory, kv),
			TourService.getToursByType(canonicalCategory, kv),
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
		canonicalCategory,
		slug,
		tour,
		allCategoryTours,
	}
}
