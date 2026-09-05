import { VITE_SANITY_ID } from '$env/static/private'
import type { BlogPost } from '$lib/types/blog.type'
import { type ClientConfig, createClient } from '@sanity/client'
import type { PageServerLoad } from './$types'

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

export const load: PageServerLoad = async () => {
	try {
		const posts: BlogPost[] = await client.fetch(
			`*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc){${extract_blog_fields}}`
		)
		return { posts }
	} catch (err) {
		console.warn('[Sanity Blog load failed, fallback will be used]:', err)
		return { posts: [] }
	}
}
