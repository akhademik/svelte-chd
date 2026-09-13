import type { Locales } from '$i18n/i18n-types'
import type { Tour } from '$lib/types/tour.type'

/**
 * Normalizes and converts any string (Vietnamese with diacritics, French accents, English) into SEO-friendly URL slug.
 */
export const slugify = (text?: string): string => {
	if (!text) return ''

	let str = text.trim().toLowerCase()

	// 1. Remove Vietnamese accents/diacritics
	str = str
		.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
		.replace(/[èéẹẻẽêềếệểễ]/g, 'e')
		.replace(/[ìíịỉĩ]/g, 'i')
		.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
		.replace(/[ùúụủũưừứựửữ]/g, 'u')
		.replace(/[ỳýỵỷỹ]/g, 'y')
		.replace(/đ/g, 'd')

	// 2. Remove French / Latin accents
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

	// 3. Remove non-alphanumeric chars (keep hyphens and spaces)
	str = str.replace(/[^a-z0-9\s-]/g, '')

	// 4. Collapse multiple spaces or hyphens into a single hyphen
	str = str.replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '')

	return str
}

export type CanonicalTourCategory = 'day-tours' | 'highland-tours'

export const TOUR_CATEGORY_SLUG_MAP: Record<string, Record<CanonicalTourCategory, string>> = {
	vi: {
		'day-tours': 'tour-trong-ngay',
		'highland-tours': 'tour-tay-nguyen',
	},
	en: {
		'day-tours': 'day-tours',
		'highland-tours': 'highland-tours',
	},
	fr: {
		'day-tours': 'excursions',
		'highland-tours': 'hauts-plateaux',
	},
}

/**
 * Returns localized category slug for a given canonical tour category.
 */
export const get_category_slug = (
	category: CanonicalTourCategory,
	lang: Locales | string = 'en'
): string => {
	const loc = lang === 'vn' ? 'vi' : lang
	return TOUR_CATEGORY_SLUG_MAP[loc]?.[category] || TOUR_CATEGORY_SLUG_MAP['en'][category]
}

/**
 * Resolves any raw URL category segment (localized or canonical) to CanonicalTourCategory.
 */
export const resolve_canonical_category = (urlCategory?: string): CanonicalTourCategory | null => {
	if (!urlCategory) return null
	const clean = urlCategory.toLowerCase().trim()

	if (['day-tours', 'tour-trong-ngay', 'tour-ngay', 'excursions'].includes(clean)) {
		return 'day-tours'
	}
	if (['highland-tours', 'tour-tay-nguyen', 'tay-nguyen', 'hauts-plateaux'].includes(clean)) {
		return 'highland-tours'
	}
	return null
}

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
