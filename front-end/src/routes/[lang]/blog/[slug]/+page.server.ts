import { EXTRACT_BLOG_FIELDS, sanityClient, withKvSnapshot } from '$lib/server/sanity-client'
import type { BlogPost } from '$lib/types/blog.type'
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
		post = await withKvSnapshot(
			kv,
			`snapshot:blog:${slug}`,
			async () => {
				const query = `*[_type == 'blogPost' && (
					slug.current == $slug ||
					slug.vn.current == $slug ||
					slug.en.current == $slug ||
					slug.fr.current == $slug
				)][0]{${EXTRACT_BLOG_FIELDS}}`

				const res = await sanityClient.fetch(query, { slug })
				return res || null
			},
			data => data !== undefined && data !== null
		)
	} catch (err) {
		console.error('[Blog detail load — total failure, no snapshot available]:', err)
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
