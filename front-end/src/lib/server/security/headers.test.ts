import { describe, expect, it } from 'vitest'
import { applySecurityHeaders, CSP_DIRECTIVES } from './headers'

describe('applySecurityHeaders', () => {
	it('applies standard security headers and CSP to page responses', () => {
		const res = new Response('<html></html>', {
			headers: { 'Content-Type': 'text/html' },
		})

		const secured = applySecurityHeaders(res)

		expect(secured.headers.get('X-Content-Type-Options')).toBe('nosniff')
		expect(secured.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
		expect(secured.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
		expect(secured.headers.get('Permissions-Policy')).toBe(
			'camera=(), microphone=(), geolocation=()'
		)
		expect(secured.headers.get('Cross-Origin-Opener-Policy')).toBe('same-origin')
		expect(secured.headers.get('Content-Security-Policy')).toBe(CSP_DIRECTIVES)
	})

	it('applies strict API security headers without page CSP and with DENY frame options', () => {
		const res = new Response(JSON.stringify({ ok: true }), {
			headers: { 'Content-Type': 'application/json' },
		})

		const secured = applySecurityHeaders(res, { isApi: true })

		expect(secured.headers.get('X-Content-Type-Options')).toBe('nosniff')
		expect(secured.headers.get('X-Frame-Options')).toBe('DENY')
		expect(secured.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
		expect(secured.headers.get('Permissions-Policy')).toBe(
			'camera=(), microphone=(), geolocation=()'
		)
		expect(secured.headers.get('Cross-Origin-Opener-Policy')).toBe('same-origin')
		expect(secured.headers.get('Content-Security-Policy')).toBeNull()
	})

	it('supports Content-Security-Policy-Report-Only mode', () => {
		const res = new Response('<html></html>')
		const secured = applySecurityHeaders(res, { cspReportOnly: true })

		expect(secured.headers.get('Content-Security-Policy')).toBeNull()
		expect(secured.headers.get('Content-Security-Policy-Report-Only')).toBe(CSP_DIRECTIVES)
	})
})
