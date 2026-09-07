import { Logger } from '$lib/utils/logger'

/**
 * Executes a fetcher with Cloudflare KV snapshot backup for disaster recovery.
 * If the fetcher succeeds and validates, it updates the KV snapshot in the background.
 * If the fetcher fails (Sanity down/unreachable), it falls back to the KV snapshot.
 */
export async function withKvSnapshot<T>(
	kv: KVNamespace | undefined,
	snapshotKey: string,
	fetcher: () => Promise<T>,
	isValidResult: (data: T) => boolean = () => true,
	ttlSeconds: number = 60 * 60 * 24 * 14 // 14 days default for disaster recovery
): Promise<T> {
	try {
		const fresh = await fetcher()
		if (isValidResult(fresh)) {
			if (kv) {
				// Write snapshot in background with TTL, don't block response, don't throw if KV fails
				kv.put(snapshotKey, JSON.stringify(fresh), {
					expirationTtl: ttlSeconds,
				}).catch((err: unknown) =>
					Logger.warn('SanityKV', `Snapshot write failed for ${snapshotKey}:`, err)
				)
			}
			return fresh
		}
		throw new Error(`Validation failed for ${snapshotKey}, attempting snapshot fallback`)
	} catch (err) {
		Logger.warn('SanityKV', `Sanity fetch failed, trying KV snapshot for ${snapshotKey}:`, err)
		if (kv) {
			const cached = await kv.get(snapshotKey)
			if (cached) {
				Logger.info('SanityKV', `KV snapshot HIT: ${snapshotKey}`)
				return JSON.parse(cached) as T
			}
		}
		Logger.error('SanityKV', `KV snapshot MISS, no fallback available: ${snapshotKey}`)
		throw err
	}
}
