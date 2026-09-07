import type { BlogPost } from '$lib/types/blog.type'

/**
 * Maps raw Sanity blog document into canonical BlogPost domain model.
 * Decouples schema quirks/legacy fields from UI components.
 */
export function mapSanityToBlogPost(raw: any): BlogPost {
	if (!raw) return raw

	return {
		...raw,
		_id: String(raw._id ?? ''),
		title: raw.title ?? {},
		slug: raw.slug ?? {},
		category: raw.category ?? 'story',
		excerpt: raw.excerpt ?? {},
		coverImg: raw.coverImg ?? raw.imgCover ?? raw.img_cover,
		imgTour: raw.imgTour ?? raw.img_tour ?? [],
		img_tour: raw.imgTour ?? raw.img_tour ?? [],
		content: raw.content ?? {},
		isFeatured: Boolean(raw.isFeatured ?? false),
		publishedAt: raw.publishedAt ?? raw._createdAt ?? new Date().toISOString(),
		author: raw.author ?? 'CHD Travel Team',
	}
}

export function mapSanityToBlogPosts(rawList: any[]): BlogPost[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToBlogPost).filter(Boolean)
}
