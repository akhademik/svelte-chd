import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const siteUrl = url.origin
	const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`.trim()

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400',
		},
	})
}
