import { TourService, type TourType } from '$lib/server/services/tour.service'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { tourtype } = params

	if (!tourtype || !['day-tours', 'highland-tours'].includes(tourtype)) {
		throw error(404, 'Tour category not found')
	}

	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=259200',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV
	const tours = await TourService.getToursByType(tourtype as TourType, kv)

	return {
		tourtype,
		tours,
	}
}
