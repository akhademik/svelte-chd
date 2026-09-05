import { VITE_SANITY_ID } from '$env/static/private'
import { type ClientConfig, createClient } from '@sanity/client'
import { json } from '@sveltejs/kit'

const config: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03',
}

const client = createClient(config)

const extract_blog_fields = `
	_id,
	"title": coalesce(title, {}),
	"slug": coalesce(slug, {}),
	"category": coalesce(category, 'story'),
	"excerpt": coalesce(excerpt, {}),
	"coverImg": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"img_tour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"content": coalesce(content, {}),
	"isFeatured": coalesce(isFeatured, false),
	"publishedAt": coalesce(publishedAt, _createdAt),
	"author": coalesce(author, 'CHD Travel Team')
`

export const GET = async ({ url }) => {
	const category = url.searchParams.get('category')
	const slug = url.searchParams.get('slug')

	try {
		if (slug) {
			const post = await client.fetch(
				`*[_type == 'blogPost' && (slug.vn.current == $slug || slug.en.current == $slug || slug.fr.current == $slug || slug.current == $slug)][0]{${extract_blog_fields}}`,
				{ slug }
			)
			return json({ post })
		}

		let query = `*[_type == 'blogPost']`
		const params: Record<string, string> = {}

		if (category && category !== 'all') {
			query += ` && category == $category`
			params.category = category
		}

		query += ` | order(publishedAt desc, _createdAt desc){${extract_blog_fields}}`

		const posts = await client.fetch(query, params)
		return json({ posts })
	} catch (err) {
		console.error('[Blog API Error]:', err)
		return json({ posts: [], error: 'Failed to fetch blog posts' }, { status: 500 })
	}
}
