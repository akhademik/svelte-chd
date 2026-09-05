import { fetchSingleTourBySlug, fetchToursByType } from '$lib/server/sanity-client'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { tourtype, slug } = params

	if (!tourtype || !slug) {
		throw error(404, 'Tour not found')
	}

	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200',
	})

	const [tour, allCategoryTours] = await Promise.all([
		fetchSingleTourBySlug(slug, tourtype),
		fetchToursByType(tourtype),
	])

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
