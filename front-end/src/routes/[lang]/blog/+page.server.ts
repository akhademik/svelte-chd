import { BlogService } from '$lib/server/services/blog.service'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ setHeaders, platform }) => {
	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=259200',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV
	const posts = await BlogService.getAllBlogs(kv)
	return { posts }
}
