import { BlogService } from '$lib/server/services/blog.service'
import { TourService } from '$lib/server/services/tour.service'
import type { BlogPost } from '$lib/types/blog.type'
import type { Tour } from '$lib/types/tour.type'
import { getCategorySlug, type CanonicalTourCategory } from '$lib/utils/format-data'
import { Logger } from '$lib/utils/logger'
import { getBlogSlug, getTourSlug } from '$lib/utils/slug'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, platform }) => {
	const siteUrl = url.origin
	const languages = ['en', 'vi', 'fr']
	const staticRoutes = ['', 'about', 'contact', 'blog']
	const tourCategories: CanonicalTourCategory[] = ['day-tours', 'highland-tours']
	const kv = platform?.env?.SANITY_SNAPSHOT_KV

	let dayTours: Tour[] = []
	let highlandTours: Tour[] = []
	let blogs: BlogPost[] = []

	try {
		const [dayRes, highlandRes, blogsRes] = await Promise.all([
			TourService.getToursByType('day-tours', kv),
			TourService.getToursByType('highland-tours', kv),
			BlogService.getAllBlogs(kv),
		])
		dayTours = dayRes || []
		highlandTours = highlandRes || []
		blogs = blogsRes || []
	} catch (e) {
		Logger.error('Sitemap', 'Error fetching sitemap data from Service Layer:', e)
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
			const catSlug = getCategorySlug(cat, lang)
			urls.push(`
	<url>
		<loc>${siteUrl}/${lang}/${catSlug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`)
		}
	}

	// 2. Dynamic Tour pages per language with localized category and virtual slug
	const categorizedTours: Array<{ tour: Tour; canonicalCat: CanonicalTourCategory }> = [
		...dayTours.map(tour => ({ tour, canonicalCat: 'day-tours' as const })),
		...highlandTours.map(tour => ({ tour, canonicalCat: 'highland-tours' as const })),
	]

	for (const { tour, canonicalCat } of categorizedTours) {
		for (const lang of languages) {
			const catSlug = getCategorySlug(canonicalCat, lang)
			const slug = getTourSlug(tour, lang)

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

	// 3. Dynamic Blog pages per language with localized virtual slug and accurate lastmod
	for (const blog of blogs) {
		const lastmodDate = new Date(blog.updatedAt ?? blog.publishedAt ?? Date.now())
		const lastmod = isNaN(lastmodDate.getTime())
			? new Date().toISOString().split('T')[0]
			: lastmodDate.toISOString().split('T')[0]

		for (const lang of languages) {
			const slug = getBlogSlug(blog, lang)

			if (slug) {
				urls.push(`
	<url>
		<loc>${siteUrl}/${lang}/blog/${slug}</loc>
		<lastmod>${lastmod}</lastmod>
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
