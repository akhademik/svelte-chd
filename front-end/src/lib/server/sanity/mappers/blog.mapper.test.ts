import { describe, it, expect } from 'vitest'
import { mapSanityToBlogPost, mapSanityToBlogPosts } from './blog.mapper'

describe('blog.mapper', () => {
	it('maps raw Sanity blog document into canonical BlogPost with defaults', () => {
		const raw = {
			_id: 'post-1',
			title: { vi: 'Bài viết 1' },
		}

		const mapped = mapSanityToBlogPost(raw)

		expect(mapped._id).toBe('post-1')
		expect(mapped.title.vi).toBe('Bài viết 1')
		expect(mapped.category).toBe('story')
		expect(mapped.isFeatured).toBe(false)
		expect(mapped.author).toBe('CHD Travel Team')
		expect(mapped.imgTour).toEqual([])
		expect(mapped.img_tour).toEqual([])
		expect(mapped.publishedAt).toBeDefined()
	})

	it('preserves existing attributes and mirrors imgTour to img_tour for legacy compatibility', () => {
		const raw = {
			_id: 'post-2',
			title: { en: 'Post 2' },
			category: 'culture',
			isFeatured: true,
			author: 'Jane Doe',
			imgTour: [{ asset: { _ref: 'img-1' } }],
			publishedAt: '2026-09-01T00:00:00.000Z',
			_updatedAt: '2026-09-14T10:00:00.000Z',
		}

		const mapped = mapSanityToBlogPost(raw)

		expect(mapped.category).toBe('culture')
		expect(mapped.isFeatured).toBe(true)
		expect(mapped.author).toBe('Jane Doe')
		expect(mapped.publishedAt).toBe('2026-09-01T00:00:00.000Z')
		expect(mapped.updatedAt).toBe('2026-09-14T10:00:00.000Z')
		expect(mapped.imgTour).toEqual([{ asset: { _ref: 'img-1' } }])
		expect(mapped.img_tour).toEqual([{ asset: { _ref: 'img-1' } }])
	})

	it('handles null and undefined safely', () => {
		expect(mapSanityToBlogPost(null)).toBeNull()
		expect(mapSanityToBlogPost(undefined)).toBeNull()
		expect(mapSanityToBlogPosts(null)).toEqual([])
		expect(mapSanityToBlogPosts(undefined)).toEqual([])
	})

	it('maps an array of blog posts filtering out falsy entries', () => {
		const list = [{ _id: '1', title: { vi: 'A' } }, null, { _id: '2', title: { vi: 'B' } }]
		const mapped = mapSanityToBlogPosts(list)
		expect(mapped.length).toBe(2)
		expect(mapped[0]._id).toBe('1')
		expect(mapped[1]._id).toBe('2')
	})
})
