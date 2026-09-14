export interface SecurityHeadersOptions {
	isApi?: boolean
	cspReportOnly?: boolean
}

export const CSP_DIRECTIVES = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"font-src 'self' https://fonts.gstatic.com data:",
	"img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://*.tripadvisor.com https://dynamic-media-cdn.tripadvisor.com https://media-cdn.tripadvisor.com",
	"connect-src 'self' https://*.sanity.io https://cdn.sanity.io https://cloudflareinsights.com",
	"frame-src 'self' https://maps.google.com https://www.google.com",
	"frame-ancestors 'self'",
	"base-uri 'self'",
	"form-action 'self'",
].join('; ')

/**
 * Applies unified security headers to any outgoing HTTP response.
 * Standardizes security policies across SSR pages, static assets, and API endpoints.
 */
export function applySecurityHeaders(
	response: Response,
	options: SecurityHeadersOptions = {}
): Response {
	const { isApi = false, cspReportOnly = false } = options

	// Core security headers
	response.headers.set('X-Content-Type-Options', 'nosniff')
	response.headers.set('X-Frame-Options', isApi ? 'DENY' : 'SAMEORIGIN')
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')

	// Content-Security-Policy (Applied to HTML/page views)
	if (!isApi) {
		const cspHeaderName = cspReportOnly
			? 'Content-Security-Policy-Report-Only'
			: 'Content-Security-Policy'
		response.headers.set(cspHeaderName, CSP_DIRECTIVES)
	}

	return response
}
