/**
 * Central Cache Policy Configuration
 * Single Source of Truth for in-memory and edge TTLs across server services.
 */
export const CACHE_POLICY = {
	/**
	 * Main catalog and content (Tours, Blogs) - 30 minutes
	 */
	TOURS_TTL_MS: 30 * 60 * 1000,
	BLOGS_TTL_MS: 30 * 60 * 1000,

	/**
	 * Hero images cache - 5 minutes (allows faster visual updates while remaining efficient)
	 */
	HERO_IMAGES_TTL_MS: 5 * 60 * 1000,

	/**
	 * Currency exchange rates - 60 minutes
	 */
	EXCHANGE_RATES_TTL_MS: 60 * 60 * 1000,
} as const
