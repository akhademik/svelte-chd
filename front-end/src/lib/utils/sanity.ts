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

export const get_tour_slug = (tour: Tour, lang: string = 'en') => {
	if (!tour?.tour_slug) return ''
	if (typeof tour.tour_slug === 'string') return tour.tour_slug

	// 1. Direct language lookup if tour_slug is localized: { vi: { current }, en: { current }, fr: { current } }
	if (tour.tour_slug[lang]?.current) return tour.tour_slug[lang].current
	if (lang === 'vi' && tour.tour_slug.vn?.current) return tour.tour_slug.vn.current
	if (lang === 'vn' && tour.tour_slug.vi?.current) return tour.tour_slug.vi.current

	// 2. Direct string value in localized slug: { vi: 'slug-vi', en: 'slug-en' }
	if (typeof tour.tour_slug[lang] === 'string') return tour.tour_slug[lang]
	if (lang === 'vi' && typeof tour.tour_slug.vn === 'string') return tour.tour_slug.vn
	if (lang === 'vn' && typeof tour.tour_slug.vi === 'string') return tour.tour_slug.vi

	// 3. Fallback to standard Sanity single slug: { current: 'slug' }
	if (tour.tour_slug.current) return tour.tour_slug.current

	// 4. Fallbacks across languages
	if (tour.tour_slug.en?.current) return tour.tour_slug.en.current
	if (tour.tour_slug.vi?.current) return tour.tour_slug.vi.current
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
