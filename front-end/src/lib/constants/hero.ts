import { dev } from '$app/environment'

/**
 * Shared configuration & timing for Hero image rotation.
 * Acts as the Single Source of Truth (SSOT) across Server (SSR) and Client (CSR).
 */
export const HERO_ROTATION_DEV_MS = 5 * 1000 // 5 seconds in development
export const HERO_ROTATION_PROD_MS = 5 * 60 * 1000 // 5 minutes in production

/**
 * Returns the active rotation interval based on current environment.
 */
export const getHeroRotationInterval = (isDev = dev): number => {
	return isDev ? HERO_ROTATION_DEV_MS : HERO_ROTATION_PROD_MS
}

/**
 * Calculates the active hero image index deterministically from a given timestamp.
 * Shared by both Server-Side Rendering (SSR) and Client-Side Hydration (CSR).
 */
export const calculateHeroSlotIndex = (
	totalImages: number,
	targetDate = new Date(),
	intervalMs?: number
): number => {
	if (totalImages <= 0) return 0
	const effectiveInterval = intervalMs ?? getHeroRotationInterval()
	const timeSlot = Math.floor(targetDate.getTime() / effectiveInterval)
	return Math.abs(timeSlot) % totalImages
}
