import type { Translation } from '$i18n/i18n-types'

type MenuLink = keyof Translation['nav_bar']
type MenuItem = {
	id: number
	text: MenuLink
	url: string
}

export const menu_items: MenuItem[] = [
	{
		id: 1,
		text: 'home',
		url: '/',
	},
	{
		id: 2,
		text: 'day_tours',
		url: 'day-tours',
	},
	{
		id: 3,
		text: 'highland_tours',
		url: 'highland-tours',
	},
]
