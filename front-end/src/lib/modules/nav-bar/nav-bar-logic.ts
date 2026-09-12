import type { Translation, Locales } from '$i18n/i18n-types'
import { get_category_slug, resolve_canonical_category } from '$lib/utils/format-data'

type MenuLink = keyof Translation['nav_bar']
export type MenuItem = {
	id: number
	text: MenuLink
	canonicalPath: string
}

export const menu_items: MenuItem[] = [
	{
		id: 1,
		text: 'day_tours',
		canonicalPath: '/day-tours',
	},
	{
		id: 2,
		text: 'highland_tours',
		canonicalPath: '/highland-tours',
	},
	{
		id: 3,
		text: 'blog',
		canonicalPath: '/blog',
	},
	{
		id: 4,
		text: 'about',
		canonicalPath: '/about',
	},
	{
		id: 5,
		text: 'contact',
		canonicalPath: '/contact',
	},
]

export const get_menu_url = (item: MenuItem, lang: Locales | string = 'en'): string => {
	const loc = lang === 'vn' ? 'vi' : lang
	if (item.canonicalPath === '/day-tours') {
		return `/${loc}/${get_category_slug('day-tours', loc)}`
	}
	if (item.canonicalPath === '/highland-tours') {
		return `/${loc}/${get_category_slug('highland-tours', loc)}`
	}
	return `/${loc}${item.canonicalPath}`
}

/**
 * Checks if a menu item should be active/highlighted given the current URL pathname.
 * Handles exact page matches, child/detail pages (e.g. /en/blog/slug, /vi/tour-trong-ngay/slug),
 * and localized category path aliases.
 */
export const is_menu_active = (
	item: MenuItem,
	pathname: string,
	lang: Locales | string = 'en'
): boolean => {
	if (!pathname) return false
	const loc = lang === 'vn' ? 'vi' : lang
	const targetUrl = get_menu_url(item, loc)

	// 1. Direct exact or prefix match against localized menu URL
	if (pathname === targetUrl || pathname.startsWith(`${targetUrl}/`)) {
		return true
	}

	// 2. Canonical tour category check for tour detail routes
	// Route pattern: /[lang]/[tourtype] or /[lang]/[tourtype]/[slug]
	const segments = pathname.split('/').filter(Boolean)
	if (segments.length >= 2) {
		const categorySegment = segments[1]
		const resolvedCategory = resolve_canonical_category(categorySegment)
		if (resolvedCategory === 'day-tours' && item.canonicalPath === '/day-tours') {
			return true
		}
		if (resolvedCategory === 'highland-tours' && item.canonicalPath === '/highland-tours') {
			return true
		}
	}

	// 3. Fallback check for canonicalPath (e.g. /vi/blog/slug matching canonical /blog)
	const canonicalTarget = `/${loc}${item.canonicalPath}`
	if (pathname === canonicalTarget || pathname.startsWith(`${canonicalTarget}/`)) {
		return true
	}

	return false
}
