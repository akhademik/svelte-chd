import { Logger } from '$lib/utils/logger'

interface RateLimitRecord {
	count: number
	resetAt: number
}

// In-memory sliding/fixed window storage for worker isolates
const ipLimits = new Map<string, RateLimitRecord>()

// Clean up expired records every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

function cleanupExpiredRecords() {
	const now = Date.now()
	if (now - lastCleanup < CLEANUP_INTERVAL) return
	lastCleanup = now
	for (const [key, record] of ipLimits.entries()) {
		if (record.resetAt <= now) {
			ipLimits.delete(key)
		}
	}
}

export interface RateLimitOptions {
	maxRequests: number
	windowMs: number
	keyPrefix?: string
}

export interface RateLimitResult {
	allowed: boolean
	remaining: number
	resetInSeconds: number
}

/**
 * Extracts client IP from standard reverse proxy / Cloudflare headers.
 */
export function getClientIp(request: Request): string {
	return (
		request.headers.get('cf-connecting-ip') ||
		request.headers.get('x-real-ip') ||
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		'127.0.0.1'
	)
}

/**
 * Rate limits requests per client IP.
 * Default: 5 requests per 10 minutes.
 */
export function checkRateLimit(
	request: Request,
	options: RateLimitOptions = { maxRequests: 5, windowMs: 10 * 60 * 1000 }
): RateLimitResult {
	cleanupExpiredRecords()

	const ip = getClientIp(request)
	const key = `${options.keyPrefix || 'rl'}:${ip}`
	const now = Date.now()

	const record = ipLimits.get(key)

	if (!record || record.resetAt <= now) {
		ipLimits.set(key, {
			count: 1,
			resetAt: now + options.windowMs,
		})
		return {
			allowed: true,
			remaining: options.maxRequests - 1,
			resetInSeconds: Math.ceil(options.windowMs / 1000),
		}
	}

	if (record.count >= options.maxRequests) {
		const resetInSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000))
		Logger.warn('RateLimiter', `Rate limit exceeded for IP: ${ip} (key: ${key})`)
		return {
			allowed: false,
			remaining: 0,
			resetInSeconds,
		}
	}

	record.count += 1
	return {
		allowed: true,
		remaining: options.maxRequests - record.count,
		resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
	}
}
