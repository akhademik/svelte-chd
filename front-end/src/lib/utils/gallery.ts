import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityImageAsset {
	_ref?: string
	_id?: string
	_type?: string
	[key: string]: unknown
}

export type GalleryImage = SanityImageSource & {
	_type?: string
	_key?: string
	asset?: SanityImageAsset
	caption?: string
	alt?: string
	hotspot?: unknown
	crop?: unknown
	[key: string]: unknown
}

export interface PortableTextBlock {
	_type: string
	_key?: string
	asset?: SanityImageAsset
	children?: Array<{
		_type?: string
		text?: string
		[key: string]: unknown
	}>
	[key: string]: unknown
}

/**
 * Extracts embedded image items from PortableText blocks.
 */
export const extract_portable_text_images = (
	blocks?: PortableTextBlock[] | unknown[] | null
): GalleryImage[] => {
	if (!Array.isArray(blocks)) return []
	const result: GalleryImage[] = []

	for (const block of blocks) {
		if (
			block &&
			typeof block === 'object' &&
			(block as Record<string, unknown>)._type === 'image' &&
			(block as Record<string, unknown>).asset
		) {
			result.push(block as GalleryImage)
		}
	}

	return result
}

/**
 * Deduplicates an array of GalleryImages based on asset reference.
 */
export const deduplicate_gallery_images = (images: GalleryImage[]): GalleryImage[] => {
	const seen = new Set<string>()
	const result: GalleryImage[] = []

	for (const img of images) {
		if (!img || typeof img !== 'object') continue
		const ref = img.asset?._ref || img.asset?._id
		if (ref) {
			if (seen.has(ref)) continue
			seen.add(ref)
		}
		result.push(img)
	}

	return result
}

export interface CollectGalleryImagesParams {
	coverImage?: GalleryImage | null
	album?: GalleryImage[] | null
	content?: PortableTextBlock[] | unknown[] | null
	maxContentImages?: number
}

/**
 * Normalizes and collects gallery images from cover, album, and content blocks.
 */
export const collect_gallery_images = ({
	coverImage,
	album,
	content,
	maxContentImages = 5,
}: CollectGalleryImagesParams = {}): GalleryImage[] => {
	const candidates: GalleryImage[] = []

	if (coverImage?.asset) {
		candidates.push(coverImage)
	}

	if (Array.isArray(album)) {
		for (const img of album) {
			if (img?.asset) {
				candidates.push(img)
			}
		}
	}

	if (candidates.length < maxContentImages && Array.isArray(content) && content.length > 0) {
		const embeddedImages = extract_portable_text_images(content)
		candidates.push(...embeddedImages)
	}

	return deduplicate_gallery_images(candidates)
}
