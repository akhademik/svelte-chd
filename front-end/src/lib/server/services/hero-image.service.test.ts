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

	it('rotates deterministically based on day of year when no image is sticky', () => {
		const day1 = new Date(2026, 0, 1) // Day 0 -> index 0
		const day2 = new Date(2026, 0, 2) // Day 1 -> index 1
		const day3 = new Date(2026, 0, 3) // Day 2 -> index 2
		const day4 = new Date(2026, 0, 4) // Day 3 -> index 0 (mod 3)

		expect(selectDailyHeroImage(mockImages, day1)?._id).toBe('1')
		expect(selectDailyHeroImage(mockImages, day2)?._id).toBe('2')
		expect(selectDailyHeroImage(mockImages, day3)?._id).toBe('3')
		expect(selectDailyHeroImage(mockImages, day4)?._id).toBe('1')
	})
})
