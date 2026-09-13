import type { Tour } from '$lib/types/tour.type'
import { slugify } from './format-data'

/**
 * Derives SEO-friendly virtual tour slug formatted as `{tour_id}-{slug}` (e.g., `dl-01-kham-pha-ho-lak`).
 */
export const get_tour_slug = (tour: Tour, lang: string = 'en'): string => {
	if (!tour) return ''

	const loc = lang === 'vn' ? 'vi' : lang

	// 1. Primary: Virtual derived slug from localized tour name
	const localizedTitle =
		tour.tour_name?.[loc] ||
		(loc === 'vi' ? tour.tour_name?.vn : undefined) ||
		tour.tour_name?.en ||
		tour.tour_name?.fr ||
		tour.tour_name?.vi

	let nameSlug = ''
	if (localizedTitle && typeof localizedTitle === 'string') {
		nameSlug = slugify(localizedTitle)
	}

	const rawTourId = (tour.tour_id || '').trim().toLowerCase()

	// If tour has both tour_id and localized title, generate hybrid `{tour_id}-{nameSlug}`
	if (rawTourId && nameSlug) {
		// If nameSlug already starts with tour_id prefix, don't duplicate
		if (nameSlug.startsWith(rawTourId)) {
			return nameSlug
		}
		return `${rawTourId}-${nameSlug}`
	}

	if (nameSlug) return nameSlug

	// 2. Legacy fallback: Check document tour_slug if present from older Sanity docs
	if (tour.tour_slug) {
		if (typeof tour.tour_slug === 'string') return tour.tour_slug
		const targetSlug =
			tour.tour_slug[loc]?.current ||
			tour.tour_slug[loc] ||
			(loc === 'vi' ? tour.tour_slug.vn?.current || tour.tour_slug.vn : undefined) ||
			tour.tour_slug.current ||
			tour.tour_slug.en?.current ||
			tour.tour_slug.en
		if (typeof targetSlug === 'string' && targetSlug) return targetSlug
	}

	// 3. Last fallback: raw tour_id
	return tour.tour_id || ''
}

/**
 * Derives SEO-friendly virtual blog slug from localized blog title.
 */
export const get_blog_slug = (blog: any, lang: string = 'en'): string => {
	if (!blog) return ''
	const loc = lang === 'vn' ? 'vi' : lang

	const localizedTitle =
		blog.title?.[loc] ||
		(loc === 'vi' ? blog.title?.vn : undefined) ||
		blog.title?.en ||
		blog.title?.fr ||
		blog.title?.vi ||
		(typeof blog.title === 'string' ? blog.title : '')

	if (localizedTitle) {
		const derived = slugify(localizedTitle)
		if (derived) return derived
	}

	if (blog.slug) {
		if (typeof blog.slug === 'string') return blog.slug
		const targetSlug =
			blog.slug[loc]?.current ||
			blog.slug[loc] ||
			(loc === 'vi' ? blog.slug.vn?.current || blog.slug.vn : undefined) ||
			blog.slug.current ||
			blog.slug.en?.current ||
			blog.slug.en
		if (typeof targetSlug === 'string' && targetSlug) return targetSlug
	}

	return blog._id || ''
}
