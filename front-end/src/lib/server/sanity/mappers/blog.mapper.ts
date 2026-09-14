import type { BlogPost } from '$lib/types/blog.type'

export type SanityBlogPostRaw = {
	_id?: string
	_createdAt?: string
	_updatedAt?: string
	updatedAt?: string
	title?: BlogPost['title']
	slug?: BlogPost['slug']
	category?: string
	excerpt?: BlogPost['excerpt']
	coverImg?: BlogPost['coverImg']
	imgTour?: BlogPost['imgTour']
	img_tour?: BlogPost['img_tour']
	content?: BlogPost['content']
	isFeatured?: boolean
	publishedAt?: string
	author?: string
	[key: string]: unknown
}

/**
 * Maps raw Sanity blog document into canonical BlogPost domain model.
 * Decouples schema quirks/legacy fields from UI components.
 */
export function mapSanityToBlogPost(raw: null | undefined): null
export function mapSanityToBlogPost(raw: SanityBlogPostRaw): BlogPost
export function mapSanityToBlogPost(raw: SanityBlogPostRaw | null | undefined): BlogPost | null
export function mapSanityToBlogPost(raw: SanityBlogPostRaw | null | undefined): BlogPost | null {
	if (!raw) return null

	const publishedAt = String(raw.publishedAt ?? raw._createdAt ?? new Date().toISOString())
	const rawUpdatedAt = raw.updatedAt ?? raw._updatedAt
	const updatedAt = rawUpdatedAt ? String(rawUpdatedAt) : undefined

	return {
		...raw,
		_id: String(raw._id ?? ''),
		title: raw.title ?? {},
		slug: raw.slug ?? {},
		category: (raw.category as BlogPost['category']) ?? 'story',
		excerpt: raw.excerpt ?? {},
		coverImg: raw.coverImg,
		imgTour: raw.imgTour ?? [],
		img_tour: raw.imgTour ?? [],
		content: raw.content ?? {},
		isFeatured: Boolean(raw.isFeatured ?? false),
		publishedAt,
		updatedAt,
		author: String(raw.author ?? 'CHD Travel Team'),
	}
}

export function mapSanityToBlogPosts(
	rawList: Array<SanityBlogPostRaw | null | undefined> | null | undefined
): BlogPost[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToBlogPost).filter((p): p is BlogPost => p !== null)
}
