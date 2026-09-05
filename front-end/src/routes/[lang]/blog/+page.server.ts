import { fetchAllBlogs } from '$lib/server/sanity-client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
	})

	const posts = await fetchAllBlogs()
	return { posts }
}
