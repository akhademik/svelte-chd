import type { Locales } from '$i18n/i18n-types'
import type { Price } from '$lib/types/tour.type'

import { get_exchange_rate } from './sanity'

export const format_price = (price: number, locale: Locales) => {
	const locale_table = {
		vn: { currency: 'VN', symbol: 'đ' },
		en: { currency: 'USD', symbol: '$' },
		fr: { currency: 'EUR', symbol: '€' },
	}
	const { currency, symbol } = locale_table[locale]
	const rate = get_exchange_rate(currency)
	const final_price = Math.round(price * rate)
	return `${symbol} ${final_price.toLocaleString('en-us')}`
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

export const format_price_object = (price: Price) => {
	const price_to_array = Object.entries(price.tour_price)
	const price_exclude_type = price_to_array.filter(([key]) => key !== '_type')
	return price_exclude_type
}
