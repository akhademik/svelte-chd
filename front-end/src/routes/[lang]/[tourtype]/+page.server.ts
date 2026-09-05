import { fetchToursByType } from '$lib/server/sanity-client'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { tourtype } = params

	if (!tourtype || !['day-tours', 'highland-tours'].includes(tourtype)) {
		throw error(404, 'Tour category not found')
	}

	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
	})

	const tours = await fetchToursByType(tourtype)

	return {
		tourtype,
		tours,
	}
}
