import { describe, expect, it } from 'vitest'
import { selectDailyHeroImage } from './hero-image.service'
import type { HeroImage } from '$lib/types/hero-image.type'

describe('HeroImageService - selectDailyHeroImage', () => {
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

	it('rotates deterministically based on 5-minute time slots when no image is sticky', () => {
		const baseTime = 1757721600000 // A fixed base timestamp
		const slot1 = new Date(baseTime) // Slot 0
		const slot2 = new Date(baseTime + 5 * 60 * 1000) // Slot 1 (+5 min)
		const slot3 = new Date(baseTime + 10 * 60 * 1000) // Slot 2 (+10 min)
		const slot4 = new Date(baseTime + 15 * 60 * 1000) // Slot 3 (+15 min -> mod 3 == 0)

		const interval = 5 * 60 * 1000
		const id1 = selectDailyHeroImage(mockImages, slot1, interval)?._id
		const id2 = selectDailyHeroImage(mockImages, slot2, interval)?._id
		const id3 = selectDailyHeroImage(mockImages, slot3, interval)?._id
		const id4 = selectDailyHeroImage(mockImages, slot4, interval)?._id

		expect(id1).toBe('1')
		expect(id2).toBe('2')
		expect(id3).toBe('3')
		expect(id4).toBe('1')
	})
})
