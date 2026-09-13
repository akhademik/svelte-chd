import { dev } from '$app/environment'
import { DEFAULT_EXCHANGE_RATES } from '$lib/constants/exchange-rates'
import { exchange_rates_store } from '$lib/stores/exchange-rates-store'
import type { ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource, SanityProjectDetails } from '@sanity/image-url/lib/types/types'

// Re-exports for backwards compatibility and clean cohesion
export { get_tour_slug, get_blog_slug } from './slug'
export { tour_by_index, get_length_and_index } from './navigation'

const config: ClientConfig = {
	projectId: import.meta.env.VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

const builder = imageUrlBuilder(config as SanityProjectDetails)

export const url_for = (source: SanityImageSource) => {
	return builder.image(source)
}

export const get_exchange_rate = (rate: string) => {
	const storeRates = exchange_rates_store.getRates()
	if (storeRates?.[rate]) {
		return storeRates[rate]
	}
	return DEFAULT_EXCHANGE_RATES[rate as 'USD' | 'EUR'] ?? 1
}

export interface CollectGalleryImagesParams {
	coverImage?: any
	album?: any
	content?: any
	maxContentImages?: number
}

/**
 * Extracts and deduplicates gallery images from cover image, album array, and PortableText content blocks.
 */
export const collect_gallery_images = ({
	coverImage,
	album,
	content,
	maxContentImages = 5,
}: CollectGalleryImagesParams = {}): any[] => {
	const list: any[] = []
	const seenRefs = new Set<string>()

	const addImg = (img: any) => {
		if (!img) return
		const ref =
			img?.asset?._ref || img?.asset?._id || img?._id || (typeof img === 'string' ? img : null)
		if (img?.asset || (typeof img === 'object' && (img._ref || img.url))) {
			if (ref && seenRefs.has(ref)) return
			if (ref) seenRefs.add(ref)
			list.push(img)
		}
	}

	// 1. Cover Image
	addImg(coverImage)

	// 2. Album / Extra Images
	if (Array.isArray(album) && album.length > 0) {
		album.forEach(img => addImg(img))
	}

	// 3. Images from PortableText content if album is short
	if (list.length < maxContentImages && Array.isArray(content) && content.length > 0) {
		content.forEach((block: any) => {
			if (block?._type === 'image' && block?.asset) {
				addImg(block)
			}
		})
	}

	return list
}
