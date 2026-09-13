import { calculateHeroSlotIndex } from '$lib/constants/hero'
import { withKvSnapshot } from '$lib/server/cache/kv-snapshot'
import { cachedFetch } from '$lib/server/cache/memory-cache'
import { sanityClient } from '$lib/server/sanity/client'
import { HERO_IMAGES_QUERY } from '$lib/server/sanity/queries/hero-images'
import type { HeroImage } from '$lib/types/hero-image.type'
import { Logger } from '$lib/utils/logger'

/**
 * Selects the active hero image based on:
 * 1. If any image has `isSticky: true`, return that sticky image.
 * 2. Otherwise, select an image based on the shared time-slot calculation
 *    so it automatically and deterministically rotates every 3 minutes.
 */
export const selectDailyHeroImage = (
	images: HeroImage[],
	targetDate = new Date(),
	intervalMs?: number
): HeroImage | null => {
	if (!images || images.length === 0) return null

	// 1. Sticky priority: Find the single sticky item
	const stickyImage = images.find(img => img.isSticky)
	if (stickyImage) return stickyImage

	// 2. Periodic time-slot rotation: shared with client carousel logic
	const index = calculateHeroSlotIndex(images.length, targetDate, intervalMs)
	return images[index] || images[0] || null
}

export const HeroImageService = {
	/**
	 * Fetches all active hero images from Sanity with memory cache & KV snapshot backup.
	 */
	async getHeroImages(kv?: KVNamespace): Promise<HeroImage[]> {
		return cachedFetch('active-hero-images', 30 * 60 * 1000, async () => {
			try {
				return await withKvSnapshot(
					kv,
					'snapshot:hero-images',
					async () => {
						const rawImages = await sanityClient.fetch<HeroImage[]>(HERO_IMAGES_QUERY)
						return Array.isArray(rawImages) ? rawImages : []
					},
					data => Array.isArray(data) && data.length > 0
				)
			} catch (err) {
				Logger.warn('HeroImageService', 'Error fetching hero images from Sanity:', err)
				return []
			}
		})
	},

	/**
	 * Returns the currently active hero image (sticky or day-of-year rotation).
	 */
	async getActiveHeroImage(kv?: KVNamespace, targetDate = new Date()): Promise<HeroImage | null> {
		const images = await this.getHeroImages(kv)
		return selectDailyHeroImage(images, targetDate)
	},
}
