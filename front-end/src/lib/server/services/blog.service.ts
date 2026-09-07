import { cachedFetch } from '$lib/server/cache/memory-cache'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { sanityClient } from '$lib/server/sanity/client'
import { mapSanityToBlogPost, mapSanityToBlogPosts } from '$lib/server/sanity/mappers/blog.mapper'
import {
	ALL_BLOGS_QUERY,
	EXTRACT_BLOG_FIELDS,
	FALLBACK_BLOGS_QUERY,
	FEATURED_BLOGS_QUERY,
} from '$lib/server/sanity/queries/blogs'
import type { BlogPost } from '$lib/types/blog.type'

export const BlogService = {
	/**
	 * Fetches featured blog posts (with fallback) with multi-layer cache.
	 */
	async getFeaturedBlogs(kv?: KVNamespace): Promise<BlogPost[]> {
		return cachedFetch('featured-blogs', 5 * 60 * 1000, async () => {
			return withKvSnapshot(
				kv,
				'snapshot:featured-blogs',
				async () => {
					let posts: any[] = await sanityClient.fetch(FEATURED_BLOGS_QUERY)
					if (!posts || posts.length === 0) {
						posts = await sanityClient.fetch(FALLBACK_BLOGS_QUERY)
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
		return cachedFetch('all-blogs', 5 * 60 * 1000, async () => {
			return withKvSnapshot(
				kv,
				'snapshot:all-blogs',
				async () => {
					const raw = await sanityClient.fetch(ALL_BLOGS_QUERY)
					return mapSanityToBlogPosts(raw || [])
				},
				data => Array.isArray(data)
			)
		})
	},

	/**
	 * Fetches a single blog post by slug with multi-layer cache.
	 */
	async getBlogBySlug(slug: string, kv?: KVNamespace): Promise<BlogPost | null> {
		return cachedFetch(`blog-${slug}`, 5 * 60 * 1000, async () => {
			return withKvSnapshot(
				kv,
				`snapshot:blog:${slug}`,
				async () => {
					const query = `*[_type == 'blogPost' && (
						slug.current == $slug ||
						slug.vn.current == $slug ||
						slug.en.current == $slug ||
						slug.fr.current == $slug
					)][0]{${EXTRACT_BLOG_FIELDS}}`

					const res = await sanityClient.fetch(query, { slug })
					return res ? mapSanityToBlogPost(res) : null
				},
				data => data !== undefined && data !== null
			)
		})
	},
}
