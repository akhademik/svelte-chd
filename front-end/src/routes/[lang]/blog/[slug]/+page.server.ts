import { EXTRACT_BLOG_FIELDS, sanityClient } from '$lib/server/sanity-client'
import type { BlogPost } from '$lib/types/blog.type'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { slug } = params

	if (!slug) {
		throw error(404, 'Blog post not found')
	}

	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=7200',
	})

	try {
		const query = `*[_type == 'blogPost' && (
			slug.current == $slug ||
			slug.vn.current == $slug ||
			slug.en.current == $slug ||
			slug.fr.current == $slug
		)][0]{${EXTRACT_BLOG_FIELDS}}`

		const post: BlogPost | null = await sanityClient.fetch(query, { slug })

		if (!post) {
			throw error(404, 'Blog post not found')
		}

		return {
			slug,
			post,
		}
	} catch (err) {
		console.error('[Blog detail load error]:', err)
		throw error(404, 'Blog post not found')
	}
}
