import type { Testimonial } from '$lib/types/testimonial.type'

export interface TestimonialViewModel {
	id?: string
	quote: string
	title?: string
	authorName: string
	authorAvatar?: string
	authorLocation?: string
	rating: number
	sourceUrl?: string
	date?: string
}

/**
 * Maps raw Sanity Testimonial entity into clean UI TestimonialViewModel.
 */
export const map_testimonial = (t: Testimonial): TestimonialViewModel => ({
	id: t._id || t.url || `${t.name}-${t.date_review || ''}`,
	quote: t.review_content || '',
	title: t.review_title || '',
	authorName: t.name || '',
	authorAvatar: t.avatar || '',
	authorLocation: t.country || '',
	rating: t.stars || 5,
	sourceUrl: t.url,
	date: t.date_review || '',
})

/**
 * Maps a list of raw Testimonials.
 */
export const map_testimonials = (rawList?: Testimonial[]): TestimonialViewModel[] => {
	if (!rawList || !Array.isArray(rawList)) return []
	return rawList.map(map_testimonial)
}
