import type { Locales } from '$i18n/i18n-types'
import type { Tour } from '$lib/types/tour.type'

import { get_exchange_rate } from './sanity'

export const format_price = (price: number, locale: Locales | string = 'en') => {
	const currentLocale = (locale || 'en') as Locales
	if (currentLocale === 'vn') {
		return `đ ${Math.round(price).toLocaleString('vi-VN')}`
	}

	if (currentLocale === 'fr') {
		const rate = get_exchange_rate('EUR')
		const final_price = Math.round(price * rate)
		return `€ ${final_price.toLocaleString('fr-FR')}`
	}

	// Default to 'en' (USD)
	const rate = get_exchange_rate('USD')
	const final_price = Math.round(price * rate)
	return `$ ${final_price.toLocaleString('en-US')}`
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
