import type { Locales } from '$i18n/i18n-types'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { exchangeRatesStore } from '$lib/stores/exchange-rates-store'
import type { Tour } from '$lib/types/tour.type'

export const getExchangeRate = (rate: string): number => {
	const storeRates = exchangeRatesStore.getRates()
	if (storeRates?.[rate]) {
		return storeRates[rate]
	}
	return DEFAULT_EXCHANGE_RATES[rate as 'USD' | 'EUR'] ?? 1
}

export const formatPrice = (price: number, locale: Locales | string = 'en'): string => {
	const currentLocale = (locale || 'en') as string
	if (currentLocale === 'vi' || currentLocale === 'vn') {
		const inThousand = Math.round(price / 1000)
		return `${inThousand.toLocaleString('vi-VN')}k`
	}

	if (currentLocale === 'fr') {
		const rate = getExchangeRate('EUR')
		const final_price = Math.round(price * rate)
		return `€${final_price.toLocaleString('fr-FR')}`
	}

	// Default to 'en' (USD)
	const rate = getExchangeRate('USD')
	const final_price = Math.round(price * rate)
	return `$${final_price.toLocaleString('en-US')}`
}

export const formatPaxNo = (key: string): string => {
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

/**
 * Maps guest count number to the corresponding pricing tier key.
 */
export const getPaxTier = (count: number): string => {
	if (count <= 1) return 'pax1'
	if (count === 2) return 'pax2'
	if (count <= 4) return 'pax3_4'
	if (count <= 6) return 'pax5_6'
	if (count <= 9) return 'pax7_9'
	return 'pax10_up'
}

export const formatPriceObject = (tour: Tour): [string, number][] => {
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
