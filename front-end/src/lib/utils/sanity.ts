import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
import type { Locales } from '$i18n/i18n-types'
import type { Tour } from '$lib/types/tour.type'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03', // use current date (YYYY-MM-DD) to target the latest API version
}

const builder = imageUrlBuilder(config as SanityProjectDetails)

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

	let data = persist_data.get(db_name)
	const less_than_24h = time_now - data?.stale_time < one_day

	if (!data || !less_than_24h) {
		console.log('fresh data')
		const res = await fetch(`/api/tours?${db_name}`)
		data = await res.json()
		persist_data.set(db_name, data)
	}
	return data.tours
}

export const tour_by_index = (tours: Tour[], index: number) => {
	const slug = tours[index].tour_slug.current
	const tour = tours.find((tour: Tour) => tour.tour_slug.current === slug)
	return tour
}

export const get_exchange_rate = (rate: string) => {
	const api_result = persist_data.get('day-tours' || 'highland-tours')
	return api_result.exchange_rate[rate] || 1
}

export const url_for = (source: SanityImageSource) => {
	return builder.image(source)
}

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
