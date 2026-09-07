import { fetchSingleTourBySlug, fetchToursByType } from '$lib/server/sanity-client'
import type { Tour } from '$lib/types/tour.type'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { tourtype, slug } = params

	if (!tourtype || !slug) {
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
			fetchSingleTourBySlug(slug, tourtype, kv),
			fetchToursByType(tourtype, kv),
		])
	} catch (err) {
		console.error('[Tour detail load — total failure, no snapshot available]:', err)
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
