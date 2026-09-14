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
	const cfIp = request.headers.get('cf-connecting-ip')
	if (cfIp) {
		return cfIp.trim()
	}

	const forwardedFor = request.headers.get('x-forwarded-for')
	if (forwardedFor) {
		const firstIp = forwardedFor.split(',')[0]?.trim()
		if (firstIp) return firstIp
	}

	const realIp = request.headers.get('x-real-ip')
	if (realIp) {
		return realIp.trim()
	}

	return '127.0.0.1'
}

export interface KVNamespaceLike {
	get(key: string, type?: 'text' | 'json'): Promise<string | null | unknown>
	put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

/**
 * Rate limits requests per client IP in memory.
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
		Logger.warn('RateLimiter', `Rate limit exceeded for IP: ${ip} (key: ${key})`)
		return {
			allowed: false,
			remaining: 0,
			resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
		}
	}

	record.count += 1
	return {
		allowed: true,
		remaining: options.maxRequests - record.count,
		resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
	}
}

/**
 * Async rate limiter with Cloudflare KV support for global synchronization across edge isolates.
 * Falls back to in-memory rate limiting when KV is not available or encounters an error.
 */
export async function checkRateLimitAsync(
	request: Request,
	options: RateLimitOptions = { maxRequests: 5, windowMs: 10 * 60 * 1000 },
	kv?: KVNamespaceLike | null
): Promise<RateLimitResult> {
	if (!kv) {
		return checkRateLimit(request, options)
	}

	try {
		const ip = getClientIp(request)
		const key = `${options.keyPrefix || 'rl'}:${ip}`
		const ttlSeconds = Math.max(60, Math.ceil(options.windowMs / 1000))

		const currentVal = await kv.get(key, 'text')
		const currentCount = typeof currentVal === 'string' ? parseInt(currentVal, 10) : 0

		if (currentCount >= options.maxRequests) {
			Logger.warn('RateLimiter', `[KV] Rate limit exceeded for IP: ${ip} (key: ${key})`)
			return {
				allowed: false,
				remaining: 0,
				resetInSeconds: ttlSeconds,
			}
		}

		const newCount = currentCount + 1
		await kv.put(key, String(newCount), { expirationTtl: ttlSeconds })

		return {
			allowed: true,
			remaining: options.maxRequests - newCount,
			resetInSeconds: ttlSeconds,
		}
	} catch (err) {
		Logger.warn('RateLimiter', 'KV rate limit check failed, falling back to in-memory:', err)
		return checkRateLimit(request, options)
	}
}
