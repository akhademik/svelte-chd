import { describe, it, expect } from 'vitest'
import {
	collectGalleryImages,
	deduplicateGalleryImages,
	extractPortableTextImages,
} from './gallery'

describe('gallery utils & image collection', () => {
	describe('deduplicateGalleryImages', () => {
		it('should deduplicate images with same asset _ref or _id', () => {
			const img1 = { asset: { _ref: 'ref-1' } }
			const img2 = { asset: { _ref: 'ref-2' } }
			const img1Dup = { asset: { _ref: 'ref-1' } }
			const imgId = { asset: { _id: 'ref-3' } }

			const result = deduplicateGalleryImages([img1, img2, img1Dup, imgId])
			expect(result).toEqual([img1, img2, imgId])
		})
	})

	describe('extractPortableTextImages', () => {
		it('should extract only image blocks that have an asset', () => {
			const blocks = [
				{ _type: 'block', children: [{ text: 'Para' }] },
				{ _type: 'image', asset: { _ref: 'img-pt-1' } },
				{ _type: 'image' }, // no asset
				{ _type: 'customBlock' },
			]
			const result = extractPortableTextImages(blocks)
			expect(result.length).toBe(1)
			expect(result[0].asset?._ref).toBe('img-pt-1')
		})
	})

	describe('collectGalleryImages', () => {
		it('should return empty array when no images provided', () => {
			expect(collectGalleryImages()).toEqual([])
			expect(collectGalleryImages({})).toEqual([])
		})

		it('should include cover image', () => {
			const cover = { asset: { _ref: 'image-cover-123' } }
			const res = collectGalleryImages({ coverImage: cover })
			expect(res).toEqual([cover])
		})

		it('should combine cover and album images, deduplicating references', () => {
			const cover = { asset: { _ref: 'img-1' } }
			const album = [
				{ asset: { _ref: 'img-1' } }, // duplicate of cover
				{ asset: { _ref: 'img-2' } },
				{ asset: { _ref: 'img-3' } },
			]
			const res = collectGalleryImages({ coverImage: cover, album })
			expect(res.length).toBe(3)
			expect(res.map(i => i.asset?._ref)).toEqual(['img-1', 'img-2', 'img-3'])
		})

		it('should extract embedded images from PortableText content if album is short', () => {
			const cover = { asset: { _ref: 'img-cover' } }
			const content = [
				{ _type: 'block', children: [{ text: 'Hello' }] },
				{ _type: 'image', asset: { _ref: 'img-content-1' } },
				{ _type: 'image', asset: { _ref: 'img-cover' } }, // duplicate of cover
				{ _type: 'image', asset: { _ref: 'img-content-2' } },
			]
			const res = collectGalleryImages({ coverImage: cover, content })
			expect(res.length).toBe(3)
			expect(res.map(i => i.asset?._ref)).toEqual(['img-cover', 'img-content-1', 'img-content-2'])
		})

		it('should strictly limit total output images to maxImages (default 5)', () => {
			const cover = { asset: { _ref: 'img-cover' } }
			const content = Array.from({ length: 20 }, (_, i) => ({
				_type: 'image',
				asset: { _ref: `img-pt-${i}` },
			}))
			const res = collectGalleryImages({ coverImage: cover, content })
			expect(res.length).toBe(5)
			expect(res[0].asset?._ref).toBe('img-cover')
			expect(res[1].asset?._ref).toBe('img-pt-0')
			expect(res[4].asset?._ref).toBe('img-pt-3')
		})

		it('should respect custom maxImages limit', () => {
			const cover = { asset: { _ref: 'img-cover' } }
			const album = [
				{ asset: { _ref: 'img-1' } },
				{ asset: { _ref: 'img-2' } },
				{ asset: { _ref: 'img-3' } },
			]
			const res = collectGalleryImages({ coverImage: cover, album, maxImages: 2 })
			expect(res.length).toBe(2)
			expect(res.map(i => i.asset?._ref)).toEqual(['img-cover', 'img-1'])
		})
	})
})
