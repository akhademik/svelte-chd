import { describe, it, expect } from 'vitest'
import {
	collect_gallery_images,
	deduplicate_gallery_images,
	extract_portable_text_images,
} from './gallery'

describe('gallery utils & image collection', () => {
	describe('deduplicate_gallery_images', () => {
		it('should deduplicate images with same asset _ref or _id', () => {
			const img1 = { asset: { _ref: 'ref-1' } }
			const img2 = { asset: { _ref: 'ref-2' } }
			const img1Dup = { asset: { _ref: 'ref-1' } }
			const imgId = { asset: { _id: 'ref-3' } }

			const result = deduplicate_gallery_images([img1, img2, img1Dup, imgId])
			expect(result).toEqual([img1, img2, imgId])
		})
	})

	describe('extract_portable_text_images', () => {
		it('should extract only image blocks that have an asset', () => {
			const blocks = [
				{ _type: 'block', children: [{ text: 'Para' }] },
				{ _type: 'image', asset: { _ref: 'img-pt-1' } },
				{ _type: 'image' }, // no asset
				{ _type: 'customBlock' },
			]
			const result = extract_portable_text_images(blocks)
			expect(result.length).toBe(1)
			expect(result[0].asset?._ref).toBe('img-pt-1')
		})
	})

	describe('collect_gallery_images', () => {
		it('should return empty array when no images provided', () => {
			expect(collect_gallery_images()).toEqual([])
			expect(collect_gallery_images({})).toEqual([])
		})

		it('should include cover image', () => {
			const cover = { asset: { _ref: 'image-cover-123' } }
			const res = collect_gallery_images({ coverImage: cover })
			expect(res).toEqual([cover])
		})

		it('should combine cover and album images, deduplicating references', () => {
			const cover = { asset: { _ref: 'img-1' } }
			const album = [
				{ asset: { _ref: 'img-1' } }, // duplicate of cover
				{ asset: { _ref: 'img-2' } },
				{ asset: { _ref: 'img-3' } },
			]
			const res = collect_gallery_images({ coverImage: cover, album })
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
			const res = collect_gallery_images({ coverImage: cover, content })
			expect(res.length).toBe(3)
			expect(res.map(i => i.asset?._ref)).toEqual(['img-cover', 'img-content-1', 'img-content-2'])
		})
	})
})
