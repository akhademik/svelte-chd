import { CACHE_POLICY } from '$lib/server/cache/cache-policy'
import { cachedFetch } from '$lib/server/cache/memory-cache'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { sanityClient } from '$lib/server/sanity/client'
import {
	mapSanityToBlogPost,
	mapSanityToBlogPosts,
	type SanityBlogPostRaw,
} from '$lib/server/sanity/mappers/blog.mapper'
import {
	ALL_BLOGS_QUERY,
	EXTRACT_BLOG_FIELDS,
	FALLBACK_BLOGS_QUERY,
	FEATURED_BLOGS_QUERY,
} from '$lib/server/sanity/queries/blogs'
import type { BlogPost } from '$lib/types/blog.type'

import { getBlogSlug } from '$lib/utils/slug'

export const matchesBlogSlug = (blog: BlogPost, targetSlug: string): boolean => {
	if (!blog || !targetSlug) return false
	const target = targetSlug.toLowerCase().trim()

	if (blog._id && blog._id.toLowerCase() === target) return true

	const vVi = getBlogSlug(blog, 'vi').toLowerCase()
	const vEn = getBlogSlug(blog, 'en').toLowerCase()
	const vFr = getBlogSlug(blog, 'fr').toLowerCase()

	return vVi === target || vEn === target || vFr === target
}

export const BlogService = {
	/**
	 * Fetches featured blog posts (with fallback) with multi-layer cache.
	 */
	async getFeaturedBlogs(kv?: KVNamespace): Promise<BlogPost[]> {
		return cachedFetch('featured-blogs', CACHE_POLICY.BLOGS_TTL_MS, async () => {
			return withKvSnapshot(
				kv,
				'snapshot:featured-blogs',
				async () => {
					let posts = await sanityClient.fetch<SanityBlogPostRaw[]>(FEATURED_BLOGS_QUERY)
					if (!posts || posts.length === 0) {
						posts = await sanityClient.fetch<SanityBlogPostRaw[]>(FALLBACK_BLOGS_QUERY)
					}
					return mapSanityToBlogPosts(posts || [])
				},
				data => Array.isArray(data)
			)
		})
	},

	/**
	 * Fetches all published blog posts with multi-layer cache.
	 */
	async getAllBlogs(kv?: KVNamespace): Promise<BlogPost[]> {
		return cachedFetch('all-blogs', CACHE_POLICY.BLOGS_TTL_MS, async () => {
			return withKvSnapshot(
				kv,
				'snapshot:all-blogs',
				async () => {
					const raw = await sanityClient.fetch<SanityBlogPostRaw[]>(ALL_BLOGS_QUERY)
					return mapSanityToBlogPosts(raw || [])
				},
				data => Array.isArray(data)
			)
		})
	},

	/**
	 * Fetches published blog posts filtered by category.
	 */
	async getBlogsByCategory(category?: string, kv?: KVNamespace): Promise<BlogPost[]> {
		if (!category || category === 'all') {
			return this.getAllBlogs(kv)
		}
		const all = await this.getAllBlogs(kv)
		return all.filter(p => p.category === category)
	},

	/**
	 * Fetches a single blog post by slug with multi-layer cache and virtual slug matching.
	 */
	async getBlogBySlug(slug: string, kv?: KVNamespace): Promise<BlogPost | null> {
		const targetSlug = slug.toLowerCase().trim()

		// 1. Search in all cached blogs
		const allBlogs = await this.getAllBlogs(kv)
		const matched = allBlogs.find(b => matchesBlogSlug(b, targetSlug))
		if (matched) return matched

		// 2. Direct GROQ fallback (for old documents or raw ID)
		return cachedFetch(`blog-${slug}`, CACHE_POLICY.BLOGS_TTL_MS, async () => {
			return withKvSnapshot(
				kv,
				`snapshot:blog:${slug}`,
				async () => {
					const query = `*[_type == 'blogPost' && (
						_id == $slug ||
						slug.current == $slug ||
						slug.vn.current == $slug ||
						slug.vi.current == $slug ||
						slug.en.current == $slug ||
						slug.fr.current == $slug
					)][0]{${EXTRACT_BLOG_FIELDS}}`

					const res = await sanityClient.fetch<SanityBlogPostRaw | null>(query, { slug })
					return res ? mapSanityToBlogPost(res) : null
				},
				data => data !== undefined && data !== null
			)
		})
	},
}
