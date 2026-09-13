import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type GalleryImage = SanityImageSource & {
	caption?: string
	alt?: string
	_type?: string
	_id?: string
	_ref?: string
	asset?: {
		_ref?: string
		_id?: string
		_type?: string
		[key: string]: unknown
	}
	url?: string
	[key: string]: unknown
}

export interface PortableTextContentBlock {
	_type?: string
	_key?: string
	asset?: {
		_ref?: string
		_id?: string
		[key: string]: unknown
	}
	children?: Array<{
		_type?: string
		text?: string
		[key: string]: unknown
	}>
	[key: string]: unknown
}

export interface CollectGalleryImagesParams {
	coverImage?: GalleryImage | null | unknown
	album?: GalleryImage[] | null | unknown
	content?: PortableTextContentBlock[] | unknown[] | null | unknown
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
}: CollectGalleryImagesParams = {}): GalleryImage[] => {
	const list: GalleryImage[] = []
	const seenRefs = new Set<string>()

	const addImg = (img?: GalleryImage | null | unknown) => {
		if (!img || typeof img !== 'object') return
		const imgObj = img as Record<string, unknown>
		const asset = imgObj.asset as Record<string, unknown> | undefined

		const ref =
			typeof asset?._ref === 'string'
				? asset._ref
				: typeof asset?._id === 'string'
					? asset._id
					: typeof imgObj._id === 'string'
						? imgObj._id
						: typeof imgObj._ref === 'string'
							? imgObj._ref
							: null

		if (asset || imgObj._ref || imgObj.url) {
			if (ref && seenRefs.has(ref)) return
			if (ref) seenRefs.add(ref)
			list.push(img as GalleryImage)
		}
	}

	// 1. Cover Image
	if (coverImage) {
		addImg(coverImage)
	}

	// 2. Album / Extra Images
	if (Array.isArray(album) && album.length > 0) {
		for (const img of album) {
			addImg(img)
		}
	}

	// 3. Images from PortableText content if album is short
	if (list.length < maxContentImages && Array.isArray(content) && content.length > 0) {
		for (const block of content) {
			if (
				block &&
				typeof block === 'object' &&
				(block as Record<string, unknown>)._type === 'image' &&
				(block as Record<string, unknown>).asset
			) {
				addImg(block)
			}
		}
	}

	return list
}
