import { dev } from '$app/environment'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { exchange_rates_store } from '$lib/stores/exchange-rates-store'
import type { Tour } from '$lib/types/tour.type'
import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

const builder = imageUrlBuilder(config as SanityProjectDetails)

import { slugify } from './format-data'

/**
 * Derives SEO-friendly virtual tour slug formatted as `{tour_id}-{slug}` (e.g., `dl-01-kham-pha-ho-lak`).
 */
export const get_tour_slug = (tour: Tour, lang: string = 'en'): string => {
	if (!tour) return ''

	const loc = lang === 'vn' ? 'vi' : lang

	// 1. Primary: Virtual derived slug from localized tour name
	const localizedTitle =
		tour.tour_name?.[loc] ||
		(loc === 'vi' ? tour.tour_name?.vn : undefined) ||
		tour.tour_name?.en ||
		tour.tour_name?.fr ||
		tour.tour_name?.vi

	let nameSlug = ''
	if (localizedTitle && typeof localizedTitle === 'string') {
		nameSlug = slugify(localizedTitle)
	}

	const rawTourId = (tour.tour_id || '').trim().toLowerCase()

	// If tour has both tour_id and localized title, generate hybrid `{tour_id}-{nameSlug}`
	if (rawTourId && nameSlug) {
		// If nameSlug already starts with tour_id prefix, don't duplicate
		if (nameSlug.startsWith(rawTourId)) {
			return nameSlug
		}
		return `${rawTourId}-${nameSlug}`
	}

	if (nameSlug) return nameSlug

	// 2. Legacy fallback: Check document tour_slug if present from older Sanity docs
	if (tour.tour_slug) {
		if (typeof tour.tour_slug === 'string') return tour.tour_slug
		const targetSlug =
			tour.tour_slug[loc]?.current ||
			tour.tour_slug[loc] ||
			(loc === 'vi' ? tour.tour_slug.vn?.current || tour.tour_slug.vn : undefined) ||
			tour.tour_slug.current ||
			tour.tour_slug.en?.current ||
			tour.tour_slug.en
		if (typeof targetSlug === 'string' && targetSlug) return targetSlug
	}

	// 3. Last fallback: raw tour_id
	return tour.tour_id || ''
}

/**
 * Derives SEO-friendly virtual blog slug from localized blog title.
 */
export const get_blog_slug = (blog: any, lang: string = 'en'): string => {
	if (!blog) return ''
	const loc = lang === 'vn' ? 'vi' : lang

	const localizedTitle =
		blog.title?.[loc] ||
		(loc === 'vi' ? blog.title?.vn : undefined) ||
		blog.title?.en ||
		blog.title?.fr ||
		blog.title?.vi ||
		(typeof blog.title === 'string' ? blog.title : '')

	if (localizedTitle) {
		const derived = slugify(localizedTitle)
		if (derived) return derived
	}

	if (blog.slug) {
		if (typeof blog.slug === 'string') return blog.slug
		const targetSlug =
			blog.slug[loc]?.current ||
			blog.slug[loc] ||
			(loc === 'vi' ? blog.slug.vn?.current || blog.slug.vn : undefined) ||
			blog.slug.current ||
			blog.slug.en?.current ||
			blog.slug.en
		if (typeof targetSlug === 'string' && targetSlug) return targetSlug
	}

	return blog._id || ''
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
	const storeRates = exchange_rates_store.getRates()
	if (storeRates?.[rate]) {
		return storeRates[rate]
	}
	return DEFAULT_EXCHANGE_RATES[rate as 'USD' | 'EUR'] ?? 1
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
