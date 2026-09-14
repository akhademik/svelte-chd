import { BlogService } from '$lib/server/services/blog.service'
import { Logger } from '$lib/utils/logger'
import { json } from '@sveltejs/kit'

export const GET = async ({ url, platform }) => {
	const category = url.searchParams.get('category')
	const slug = url.searchParams.get('slug')
	const kv = platform?.env?.SANITY_SNAPSHOT_KV

	try {
		if (slug) {
			const post = await BlogService.getBlogBySlug(slug, kv)
			return json({ post })
		}

		if (category && category !== 'all') {
			const posts = await BlogService.getBlogsByCategory(category, kv)
			return json({ posts })
		}

		const posts = await BlogService.getAllBlogs(kv)
		return json({ posts })
	} catch (err) {
		Logger.error('Blog API', 'Failed to fetch blog posts', err)
		return json({ posts: [], error: 'Failed to fetch blog posts' }, { status: 500 })
	}
}
