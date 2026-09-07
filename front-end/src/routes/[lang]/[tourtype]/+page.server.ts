import { TourService } from '$lib/server/services/tour.service'
import { resolve_canonical_category } from '$lib/utils/format-data'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { tourtype } = params

	const canonicalCategory = resolve_canonical_category(tourtype)

	if (!canonicalCategory) {
		throw error(404, 'Tour category not found')
	}

	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=259200',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV
	const tours = await TourService.getToursByType(canonicalCategory, kv)

	return {
		tourtype,
		canonicalCategory,
		tours,
	}
}
