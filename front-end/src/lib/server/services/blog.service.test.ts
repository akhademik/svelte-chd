import { describe, it, expect, vi, beforeEach } from 'vitest'
import { matchesBlogSlug, BlogService } from './blog.service'
import { sanityClient } from '$lib/server/sanity/client'
import type { BlogPost } from '$lib/types/blog.type'

vi.mock('$lib/server/sanity/client', () => ({
	sanityClient: {
		fetch: vi.fn(),
	},
}))

describe('blog.service', () => {
	const mockBlog = {
		_id: 'post-1',
		title: {
			vi: 'Khám Phá Cà Phê Buôn Ma Thuột',
			en: 'Discover Buon Ma Thuot Coffee',
			fr: 'Découverte du Café de Buon Ma Thuot',
		},
		category: 'culture',
		isFeatured: true,
		publishedAt: '2026-09-01T00:00:00.000Z',
		author: 'CHD Team',
	} as unknown as BlogPost

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('matchesBlogSlug', () => {
		it('returns false for null blog or empty slug', () => {
			expect(matchesBlogSlug(null as any, 'post-1')).toBe(false)
			expect(matchesBlogSlug(mockBlog, '')).toBe(false)
		})

		it('matches direct _id', () => {
			expect(matchesBlogSlug(mockBlog, 'post-1')).toBe(true)
			expect(matchesBlogSlug(mockBlog, 'POST-1')).toBe(true)
		})

		it('matches virtual slug derived from title', () => {
			expect(matchesBlogSlug(mockBlog, 'kham-pha-ca-phe-buon-ma-thuot')).toBe(true)
			expect(matchesBlogSlug(mockBlog, 'discover-buon-ma-thuot-coffee')).toBe(true)
		})

		it('returns false for unrelated slug', () => {
			expect(matchesBlogSlug(mockBlog, 'unrelated-post-slug')).toBe(false)
		})
	})

	describe('BlogService methods', () => {
		it('fetches featured blogs and falls back when no featured posts returned', async () => {
			// First fetch returns empty array, triggers fallback query
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValueOnce([]).mockResolvedValueOnce([
				{
					_id: 'post-fallback',
					title: { vi: 'Bài viết dự phòng' },
				},
			])

			const blogs = await BlogService.getFeaturedBlogs()
			expect(blogs.length).toBe(1)
			expect(blogs[0]._id).toBe('post-fallback')
		})

		it('fetches all blogs and maps to canonical domain model', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValueOnce([
				{
					_id: 'p1',
					title: { vi: 'Bài 1' },
					category: 'story',
				},
				{
					_id: 'p2',
					title: { vi: 'Bài 2' },
					category: 'guide',
				},
			])

			const all = await BlogService.getAllBlogs()
			expect(all.length).toBe(2)
			expect(all[0].category).toBe('story')
			expect(all[1].category).toBe('guide')
		})

		it('filters blogs by category', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValue([
				{ _id: 'p1', title: { vi: 'A' }, category: 'story' },
				{ _id: 'p2', title: { vi: 'B' }, category: 'culture' },
			])

			const storyBlogs = await BlogService.getBlogsByCategory('story')
			expect(storyBlogs.length).toBe(1)
			expect(storyBlogs[0]._id).toBe('p1')

			const allBlogs = await BlogService.getBlogsByCategory('all')
			expect(allBlogs.length).toBe(2)
		})

		it('finds blog by slug in memory cache or GROQ fallback', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValue([
				{ _id: 'post-special', title: { vi: 'Kinh Nghiệm Du Lịch Đắk Lắk' } },
			])

			const found = await BlogService.getBlogBySlug('kinh-nghiem-du-lich-dak-lak')
			expect(found).not.toBeNull()
			expect(found?._id).toBe('post-special')
		})
	})
})
