import type { Translation, Locales } from '$i18n/i18n-types'
import { get_category_slug } from '$lib/utils/format-data'

type MenuLink = keyof Translation['nav_bar']
type MenuItem = {
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
