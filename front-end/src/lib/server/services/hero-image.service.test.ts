import { describe, expect, it } from 'vitest'
import { selectDailyHeroImage } from './hero-image.service'
import {
	calculateHeroSlotIndex,
	getNextHeroRotationDelay,
	HERO_ROTATION_PROD_MS,
} from '$lib/constants/hero'
import type { HeroImage } from '$lib/types/hero-image.type'

describe('HeroImageService - selectDailyHeroImage & Hero Constants', () => {
	const mockImages: HeroImage[] = [
		{
			_id: '1',
			title: 'Mang Den Pine Forest',
			image: { asset: { _ref: 'image-1' } },
			isSticky: false,
			isActive: true,
		},
		{
			_id: '2',
			title: 'T-Nung Sea Lake',
			image: { asset: { _ref: 'image-2' } },
			isSticky: false,
			isActive: true,
		},
		{
			_id: '3',
			title: 'Dray Nur Waterfall',
			image: { asset: { _ref: 'image-3' } },
			isSticky: false,
			isActive: true,
		},
	]

	it('returns null when images array is empty', () => {
		expect(selectDailyHeroImage([])).toBeNull()
		expect(selectDailyHeroImage(null as any)).toBeNull()
	})

	it('returns sticky image regardless of day when one image has isSticky == true', () => {
		const imagesWithSticky: HeroImage[] = [
			{ ...mockImages[0], isSticky: false },
			{ ...mockImages[1], isSticky: true },
			{ ...mockImages[2], isSticky: false },
		]

		const monday = new Date(2026, 8, 14) // Monday
		const tuesday = new Date(2026, 8, 15) // Tuesday

		expect(selectDailyHeroImage(imagesWithSticky, monday)?._id).toBe('2')
		expect(selectDailyHeroImage(imagesWithSticky, tuesday)?._id).toBe('2')
	})

	it('rotates deterministically based on 3-minute time slots when no image is sticky', () => {
		const baseTime = 1757721600000 // A fixed base timestamp aligned to 0 mod (3 min)
		const slot1 = new Date(baseTime) // Slot 0
		const slot2 = new Date(baseTime + 3 * 60 * 1000) // Slot 1 (+3 min)
		const slot3 = new Date(baseTime + 6 * 60 * 1000) // Slot 2 (+6 min)
		const slot4 = new Date(baseTime + 9 * 60 * 1000) // Slot 3 (+9 min -> mod 3 == 0)

		const interval = HERO_ROTATION_PROD_MS
		const id1 = selectDailyHeroImage(mockImages, slot1, interval)?._id
		const id2 = selectDailyHeroImage(mockImages, slot2, interval)?._id
		const id3 = selectDailyHeroImage(mockImages, slot3, interval)?._id
		const id4 = selectDailyHeroImage(mockImages, slot4, interval)?._id

		expect(id1).toBe('1')
		expect(id2).toBe('2')
		expect(id3).toBe('3')
		expect(id4).toBe('1')
	})

	it('calculates getNextHeroRotationDelay correctly to the next slot boundary', () => {
		const interval = 3 * 60 * 1000 // 180,000 ms
		// Say current timestamp is at +40 seconds into the slot
		const baseTime = 1757721600000 + 40 * 1000
		const delay = getNextHeroRotationDelay(new Date(baseTime), interval)
		expect(delay).toBe(140 * 1000) // 180s - 40s = 140s
	})

	it('calculates calculateHeroSlotIndex correctly for positive timestamps and total counts', () => {
		const interval = 3 * 60 * 1000
		const baseTime = 1757721600000
		expect(calculateHeroSlotIndex(0, new Date(baseTime), interval)).toBe(0)
		expect(calculateHeroSlotIndex(3, new Date(baseTime), interval)).toBe(0)
		expect(calculateHeroSlotIndex(3, new Date(baseTime + 3 * 60 * 1000), interval)).toBe(1)
	})
})
