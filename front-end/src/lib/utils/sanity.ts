import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
import type { Locales } from '$i18n/i18n-types'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03', // use current date (YYYY-MM-DD) to target the latest API version
}

const builder = imageUrlBuilder(config as SanityProjectDetails)

const result_dict = {
	pax1: '01',
	pax2: '02',
	pax3_4: '03 - 04',
	pax5_6: '05 - 06',
	pax7_9: '07 - 09',
	pax10_up: '> 10',
}

const rates_table = {
	vn: 'vn',
	en: 'USD',
	fr: 'EUR',
}
const persist_data = {
	set: (db_name: string, data: unknown) => {
		localStorage.setItem(`chd-${db_name}`, JSON.stringify(data))
	},
	get: (db_name: string) => {
		const data = localStorage.getItem(`chd-${db_name}`)
		return data ? JSON.parse(data) : null
	},
}

export const get_sanity_data = async (db_name: string) => {
	const time_now = Date.now()
	const one_day = 1000 * 60 * 60 * 24

	let api_result = persist_data.get(db_name)
	const less_than_24h = time_now - api_result?.stale_time < one_day

	if (!api_result || !less_than_24h) {
		console.log('fresh data')
		const res = await fetch(`/api/tours?${db_name}`)
		api_result = await res.json()
		persist_data.set(db_name, api_result)
	}
	return api_result.tours
}

export const get_exchange_rate = (rate: string) => {
	const api_result = persist_data.get('day-tours' || 'highland-tours')
	return api_result.exchange_rate[rate] || 1
}

export const url_for = (source: SanityImageSource) => {
	return builder.image(source)
}

export const format_price = (price: number, locale: Locales) => {
	const currency_symbol = locale === 'vn' ? 'đ' : locale === 'en' ? '$' : '€'
	const get_rate = rates_table[locale]
	const exchange_rate = get_exchange_rate(get_rate)
	const final_price = Math.round(price * exchange_rate)
	return `${currency_symbol} ${final_price.toLocaleString('en-us')}`
}

export const format_pax_no = (key: keyof typeof result_dict): string => {
	return result_dict[key] || key
}
