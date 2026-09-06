import type { Locales } from '$i18n/i18n-types'
import type { Tour } from '$lib/types/tour.type'

import { get_exchange_rate } from './sanity'

export const format_price = (price: number, locale: Locales | string = 'en') => {
	const currentLocale = (locale || 'en') as Locales
	if (currentLocale === 'vn') {
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

	const loc = (locale || 'en') as Locales
	if (loc === 'vn') {
		return `Tháng ${month}, ${year}`
	}
	if (loc === 'fr') {
		return `${FR_MONTHS[month - 1]} ${year}`
	}
	return `${EN_MONTHS[month - 1]} ${year}`
}
