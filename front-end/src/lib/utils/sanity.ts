import type { Tour } from '$lib/types/tour.type'
import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
import type { Page } from '@sveltejs/kit'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03',
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

export const get_sanity_data = async (page: Page) => {
	const db_name = page.url.pathname.split('/')[2]
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
	const api_result = persist_data.get('day-tours') || persist_data.get('highland-tours')
	return api_result?.exchange_rate?.[rate] || 1
}

export const url_for = (source: SanityImageSource) => {
	return builder.image(source)
}

export const get_length_and_index = (tours: Tour[], slug: string) => {
	const slugs_array = tours.map(tour => tour.tour_slug.current)
	const length = slugs_array.length - 1
	const index = slugs_array.indexOf(slug)
	return { length, index }
}
