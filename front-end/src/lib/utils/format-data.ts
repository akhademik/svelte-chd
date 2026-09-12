import type { Locales } from '$i18n/i18n-types'
import type { Tour } from '$lib/types/tour.type'

import { get_exchange_rate } from './sanity'

export const format_price = (price: number, locale: Locales | string = 'en') => {
	const currentLocale = (locale || 'en') as string
	if (currentLocale === 'vi' || currentLocale === 'vn') {
		const inThousand = Math.round(price / 1000)
		return `${inThousand.toLocaleString('vi-VN')}k`
	}

	if (currentLocale === 'fr') {
		const rate = get_exchange_rate('EUR')
		const final_price = Math.round(price * rate)
		return `€${final_price.toLocaleString('fr-FR')}`
	}

	// Default to 'en' (USD)
	const rate = get_exchange_rate('USD')
	const final_price = Math.round(price * rate)
	return `$${final_price.toLocaleString('en-US')}`
}

export const format_pax_no = (key: string) => {
	type Key = keyof typeof result_dict
	const result_dict = {
		pax1: '01',
		pax2: '02',
		pax3_4: '03 - 04',
		pax5_6: '05 - 06',
		pax7_9: '07 - 09',
		pax10_up: '> 10',
	}
	return result_dict[key as Key] || key
}

export const format_price_object = (tour: Tour) => {
	if (!tour?.tour_price) return []
	return Object.entries(tour.tour_price)
		.filter(([key]) => key !== '_type')
		.sort((a, b) => {
			const matchA = a[0].match(/\d+/)
			const matchB = b[0].match(/\d+/)
			const numA = matchA ? parseInt(matchA[0]) : 0
			const numB = matchB ? parseInt(matchB[0]) : 0
			return numA - numB
		}) as [string, number][]
}

const EN_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

const FR_MONTHS = [
	'Janv',
	'Févr',
	'Mars',
	'Avr',
	'Mai',
	'Juin',
	'Juil',
	'Août',
	'Sept',
	'Oct',
	'Nov',
	'Déc',
]

export const format_review_date = (dateStr?: string, locale: Locales | string = 'en'): string => {
	if (!dateStr || !dateStr.trim()) return ''

	const trimmed = dateStr.trim()
	let month = 0
	let year = ''

	if (trimmed.includes('-')) {
		const parts = trimmed.split('-')
		if (parts[0].length === 4) {
			// YYYY-MM
			year = parts[0]
			month = parseInt(parts[1], 10)
		} else {
			// MM-YYYY
			month = parseInt(parts[0], 10)
			year = parts[1]
		}
	} else {
		return trimmed
	}

	if (!month || month < 1 || month > 12 || !year) return trimmed

	const loc = (locale || 'en') as string
	if (loc === 'vi' || loc === 'vn') {
		return `Tháng ${month}, ${year}`
	}
	if (loc === 'fr') {
		return `${FR_MONTHS[month - 1]} ${year}`
	}
	return `${EN_MONTHS[month - 1]} ${year}`
}

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
 * Safely extracts a localized string or value from a multilingual field object with fallback.
 */
export const get_localized_field = <T = string>(
	field: Record<string, T> | undefined | null,
	locale: Locales | string = 'en',
	fallback: T | '' = ''
): T | '' => {
	if (!field || typeof field !== 'object') return fallback
	const loc = locale === 'vn' ? 'vi' : locale
	if (field[loc] !== undefined && field[loc] !== null && field[loc] !== '') {
		return field[loc]
	}
	if (loc === 'vi' && field.vn !== undefined && field.vn !== null && field.vn !== '') {
		return field.vn
	}
	if (field.en !== undefined && field.en !== null && field.en !== '') {
		return field.en
	}
	if (field.vi !== undefined && field.vi !== null && field.vi !== '') {
		return field.vi
	}
	if (field.vn !== undefined && field.vn !== null && field.vn !== '') {
		return field.vn
	}
	if (field.fr !== undefined && field.fr !== null && field.fr !== '') {
		return field.fr
	}
	return fallback
}

/**
 * Checks if an entity has a valid localized title/name for the active locale or standard fallbacks.
 */
export const has_localized_title = (
	entity:
		| { title?: Record<string, any> | null; tour_name?: Record<string, any> | null }
		| undefined
		| null,
	locale: Locales | string = 'en'
): boolean => {
	if (!entity) return false
	const titleObj = entity.title || entity.tour_name
	if (!titleObj) return false
	const val = get_localized_field(titleObj, locale)
	return Boolean(val && typeof val === 'string' ? val.trim() : val)
}

/**
 * Filters a list of entities (posts, tours) ensuring only those with valid localized content are returned.
 */
export const filter_localized_items = <
	T extends { title?: Record<string, any> | null; tour_name?: Record<string, any> | null },
>(
	items: T[] | undefined | null,
	locale: Locales | string = 'en'
): T[] => {
	if (!Array.isArray(items)) return []
	return items.filter(item => has_localized_title(item, locale))
}
