import type { Locales } from '$i18n/i18n-types'

/**
 * Safely extracts a localized string or value from a multilingual field object with fallback.
 */
export const getLocalizedField = <T = string>(
	field: Record<string, T> | undefined | null,
	locale: Locales | string = 'en',
	fallback: T = '' as unknown as T
): T => {
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
export const hasLocalizedTitle = (
	entity:
		| { title?: Record<string, any> | null; tour_name?: Record<string, any> | null }
		| undefined
		| null,
	locale: Locales | string = 'en'
): boolean => {
	if (!entity) return false
	const titleObj = entity.title || entity.tour_name
	if (!titleObj) return false
	const val = getLocalizedField(titleObj, locale)
	return Boolean(val && typeof val === 'string' ? val.trim() : val)
}

/**
 * Filters a list of entities (posts, tours) ensuring only those with valid localized content are returned.
 */
export const filterLocalizedItems = <
	T extends { title?: Record<string, any> | null; tour_name?: Record<string, any> | null },
>(
	items: T[] | undefined | null,
	locale: Locales | string = 'en'
): T[] => {
	if (!Array.isArray(items)) return []
	return items.filter(item => hasLocalizedTitle(item, locale))
}

/**
 * Extracts plain text from PortableText blocks, strings, or arrays for SEO descriptions.
 */
export const extractPlainText = (blocks: unknown): string => {
	if (!blocks) return ''
	if (typeof blocks === 'string') return blocks.trim()
	if (Array.isArray(blocks)) {
		return blocks
			.map(block => {
				if (typeof block === 'string') return block
				if (
					block &&
					typeof block === 'object' &&
					'children' in block &&
					Array.isArray(block.children)
				) {
					return block.children
						.map((c: any) =>
							c && typeof c === 'object' && 'text' in c ? String(c.text || '') : ''
						)
						.join('')
				}
				return ''
			})
			.filter(Boolean)
			.join(' ')
			.trim()
	}
	return ''
}
