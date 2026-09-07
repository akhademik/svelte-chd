import { sanityClient } from '$lib/server/sanity/client'
import { EXTRACT_BLOG_FIELDS } from '$lib/server/sanity/queries/blogs'
import { EXTRACT_TOUR_FIELDS } from '$lib/server/sanity/queries/tours'
import { get_category_slug, type CanonicalTourCategory } from '$lib/utils/format-data'
import { Logger } from '$lib/utils/logger'
import { get_tour_slug } from '$lib/utils/sanity'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const siteUrl = url.origin
	const languages = ['en', 'vi', 'fr']
	const staticRoutes = ['', 'about', 'contact', 'blog']
	const tourCategories: CanonicalTourCategory[] = ['day-tours', 'highland-tours']

	let tours: any[] = []
	let blogs: any[] = []

	try {
		const [toursRes, blogsRes] = await Promise.all([
			sanityClient.fetch(`*[_type in ['tourDaily', 'tourCentral']]{_type, ${EXTRACT_TOUR_FIELDS}}`),
			sanityClient.fetch(
				`*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc){${EXTRACT_BLOG_FIELDS}}`
			),
		])
		tours = toursRes || []
		blogs = blogsRes || []
	} catch (e) {
		Logger.error('Sitemap', 'Sanity fetch error:', e)
	}

	const urls: string[] = []

	// 1. Static and Localized Category pages per language
	for (const lang of languages) {
		for (const route of staticRoutes) {
			const path = route ? `/${lang}/${route}` : `/${lang}`
			urls.push(`
	<url>
		<loc>${siteUrl}${path}</loc>
		<changefreq>weekly</changefreq>
		<priority>${route === '' ? '1.0' : '0.8'}</priority>
	</url>`)
		}

		for (const cat of tourCategories) {
			const catSlug = get_category_slug(cat, lang)
			urls.push(`
	<url>
		<loc>${siteUrl}/${lang}/${catSlug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`)
		}
	}

	// 2. Dynamic Tour pages per language with localized category and virtual slug
	for (const tour of tours) {
		const isHighland = tour._type === 'tourCentral'
		const canonicalCat: CanonicalTourCategory = isHighland ? 'highland-tours' : 'day-tours'

		for (const lang of languages) {
			const catSlug = get_category_slug(canonicalCat, lang)
			const slug = get_tour_slug(tour, lang)

			if (slug) {
				urls.push(`
	<url>
		<loc>${siteUrl}/${lang}/${catSlug}/${slug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>`)
			}
		}
	}

	// 3. Dynamic Blog pages per language
	for (const blog of blogs) {
		const slug = blog.slug?.current || (typeof blog.slug === 'string' ? blog.slug : '')

		if (slug) {
			for (const lang of languages) {
				urls.push(`
	<url>
		<loc>${siteUrl}/${lang}/blog/${slug}</loc>
		<lastmod>${new Date(blog.publishedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
	</url>`)
			}
		}
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`.trim()

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	})
}
