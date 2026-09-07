import { BlogService } from '$lib/server/services/blog.service'
import type { BlogPost } from '$lib/types/blog.type'
import { Logger } from '$lib/utils/logger'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders, platform }) => {
	const { slug } = params

	if (!slug) {
		throw error(404, 'Blog post not found')
	}

	setHeaders({
		'cache-control':
			'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200, stale-if-error=604800',
	})

	const kv = platform?.env?.SANITY_SNAPSHOT_KV

	let post: BlogPost | null = null

	try {
		post = await BlogService.getBlogBySlug(slug, kv)
	} catch (err) {
		Logger.error('BlogDetailLoad', 'Total failure, no snapshot available:', err)
		throw error(503, 'Tạm thời không thể tải dữ liệu bài viết, vui lòng thử lại sau ít phút.')
	}

	if (!post) {
		throw error(404, 'Blog post not found')
	}

	return {
		slug,
		post,
	}
}
