import { dev } from '$app/environment'
import type { Tour } from '$lib/types/tour.type'
import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'
import type { Page } from '@sveltejs/kit'

import { logger } from './logger'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-11-03',
}

const builder = imageUrlBuilder(config as SanityProjectDetails)

const persist_data = {
	set: (db_name: string, data: unknown) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(`chd-${db_name}`, JSON.stringify(data))
		}
	},
	get: (db_name: string) => {
		if (dev || typeof localStorage === 'undefined') {
			return null
		}
		const data = localStorage.getItem(`chd-${db_name}`)
		return data ? JSON.parse(data) : null
	},
}

export const get_sanity_data = async (page: Page) => {
	if (typeof window === 'undefined') {
		return []
	}
	const db_name = page.url.pathname.split('/')[2]
	const time_now = Date.now()
	const one_day = 1000 * 60 * 60 * 24

	let data = persist_data.get(db_name)
	const less_than_24h = data && time_now - data?.stale_time < one_day

	if (!data || !less_than_24h) {
		logger.log(`Fetching fresh Sanity data for: ${db_name}`)
		try {
			const res = await fetch(`/api/tours?${db_name}`)
			data = await res.json()
			logger.log(`Received ${data?.tours?.length || 0} tours for: ${db_name}`, data)
			persist_data.set(db_name, data)
		} catch (e) {
			logger.log(`Error fetching Sanity data for ${db_name}:`, e)
			return []
		}
	} else {
		logger.log(`Using cached data for: ${db_name}`)
	}
	return data?.tours || []
}

export const get_tour_slug = (tour: Tour, lang: string = 'en') => {
	if (!tour?.tour_slug) return ''
	if (typeof tour.tour_slug === 'string') return tour.tour_slug
	if (tour.tour_slug.current) return tour.tour_slug.current
	if (tour.tour_slug[lang]?.current) return tour.tour_slug[lang].current
	if (tour.tour_slug.en?.current) return tour.tour_slug.en.current
	if (tour.tour_slug.vn?.current) return tour.tour_slug.vn.current
	if (tour.tour_slug.fr?.current) return tour.tour_slug.fr.current
	return ''
}

export const tour_by_index = (tours: Tour[], index: number) => {
	if (!tours || !tours[index]) return tours?.[0]
	const target_slug = get_tour_slug(tours[index])
	const tour = tours.find((t: Tour) => {
		const s = get_tour_slug(t)
		return s === target_slug
	})
	return tour || tours[index]
}

export const get_exchange_rate = (rate: string) => {
	const api_result = persist_data.get('day-tours') || persist_data.get('highland-tours')
	return api_result?.exchange_rate?.[rate] || 1
}

export const url_for = (source: SanityImageSource) => {
	return builder.image(source)
}

export const get_length_and_index = (tours: Tour[], slug: string) => {
	if (!tours || tours.length === 0) return { length: 0, index: 0 }
	const slugs_array = tours.map(tour => get_tour_slug(tour))
	const length = slugs_array.length - 1
	const found_index = slugs_array.indexOf(slug)
	const index = found_index > -1 ? found_index : 0
	return { length, index }
}
