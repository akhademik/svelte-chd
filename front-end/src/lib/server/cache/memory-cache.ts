import { dev } from '$app/environment'

const memoryCache = new Map<string, { data: unknown; expires: number }>()

/**
 * In-memory cache for Worker isolates (extra defense layer)
 * Bypassed in dev mode.
 */
export async function cachedFetch<T>(
	key: string,
	ttlMs: number,
	fetcher: () => Promise<T>
): Promise<T> {
	if (dev) {
		return fetcher()
	}
	const now = Date.now()
	const hit = memoryCache.get(key)
	if (hit && hit.expires > now) {
		return hit.data as T
	}
	const data = await fetcher()
	memoryCache.set(key, { data, expires: now + ttlMs })
	return data
}
