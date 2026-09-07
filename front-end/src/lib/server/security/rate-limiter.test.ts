import { describe, expect, it } from 'vitest'
import { checkRateLimit, getClientIp } from './rate-limiter'

describe('Rate Limiter', () => {
	it('extracts client IP from Cloudflare header', () => {
		const req = new Request('http://localhost', {
			headers: { 'cf-connecting-ip': '203.0.113.195' },
		})
		expect(getClientIp(req)).toBe('203.0.113.195')
	})

	it('extracts client IP from X-Forwarded-For header', () => {
		const req = new Request('http://localhost', {
			headers: { 'x-forwarded-for': '198.51.100.1, 10.0.0.1' },
		})
		expect(getClientIp(req)).toBe('198.51.100.1')
	})

	it('allows requests within limit and blocks when exceeded', () => {
		const ip = '192.0.2.100'
		const createReq = () =>
			new Request('http://localhost', {
				headers: { 'cf-connecting-ip': ip },
			})

		const options = { maxRequests: 3, windowMs: 1000, keyPrefix: 'test-limit' }

		const r1 = checkRateLimit(createReq(), options)
		expect(r1.allowed).toBe(true)
		expect(r1.remaining).toBe(2)

		const r2 = checkRateLimit(createReq(), options)
		expect(r2.allowed).toBe(true)
		expect(r2.remaining).toBe(1)

		const r3 = checkRateLimit(createReq(), options)
		expect(r3.allowed).toBe(true)
		expect(r3.remaining).toBe(0)

		// Exceeded
		const r4 = checkRateLimit(createReq(), options)
		expect(r4.allowed).toBe(false)
		expect(r4.remaining).toBe(0)
	})
})
