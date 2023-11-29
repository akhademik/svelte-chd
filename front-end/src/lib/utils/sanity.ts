import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'

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

	let api_result = persist_data.get(db_name)
	const less_than_24h = time_now - api_result?.stale_time < one_day

	if (!api_result || !less_than_24h) {
		console.log('fresh data')
		api_result = await fetch(`/api/tours?${db_name}`)
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
