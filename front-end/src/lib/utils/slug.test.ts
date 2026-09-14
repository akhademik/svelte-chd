import { describe, it, expect } from 'vitest'
import { getTourSlug, getBlogSlug } from './slug'
import { matchesTourSlug } from '$lib/server/services/tour.service'
import type { Tour } from '$lib/types/tour.type'

describe('slug utils', () => {
	it('should return empty string when tour or slug is undefined', () => {
		expect(getTourSlug(null as unknown as Tour)).toBe('')
		expect(getTourSlug({} as Tour)).toBe('')
	})

	it('should handle raw string slugs', () => {
		const tour = { tour_slug: 'lak-lake-adventure' } as unknown as Tour
		expect(getTourSlug(tour)).toBe('lak-lake-adventure')
	})

	it('should handle standard Sanity slug object { current: string }', () => {
		const tour = { tour_slug: { current: 'dray-nur-waterfall' } } as unknown as Tour
		expect(getTourSlug(tour)).toBe('dray-nur-waterfall')
	})

	it('should fallback to localized slug when nested by language', () => {
		const tour = {
			tour_slug: {
				vn: { current: 'kham-pha-ho-lak' },
				en: { current: 'lak-lake-discovery' },
				fr: { current: 'decouverte-du-lac-lak' },
			},
		} as unknown as Tour

		expect(getTourSlug(tour, 'vn')).toBe('kham-pha-ho-lak')
		expect(getTourSlug(tour, 'vi')).toBe('kham-pha-ho-lak')
		expect(getTourSlug(tour, 'fr')).toBe('decouverte-du-lac-lak')
		expect(getTourSlug(tour, 'en')).toBe('lak-lake-discovery')
		expect(getTourSlug(tour, 'de')).toBe('lak-lake-discovery') // falls back to en
	})

	it('should support direct string slugs per language', () => {
		const tour = {
			tour_slug: {
				vn: 'kham-pha-ho-lak',
				en: 'lak-lake-discovery',
			},
		} as unknown as Tour

		expect(getTourSlug(tour, 'vi')).toBe('kham-pha-ho-lak')
		expect(getTourSlug(tour, 'en')).toBe('lak-lake-discovery')
	})

	it('should derive virtual slug from tourName when tourSlug is absent', () => {
		const tour: Tour = {
			tourName: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
				fr: 'Découverte du Lac Lắk 1 Jour',
			},
		}

		expect(getTourSlug(tour, 'vi')).toBe('kham-pha-ho-lak-1-ngay')
		expect(getTourSlug(tour, 'en')).toBe('lak-lake-1-day-discovery')
		expect(getTourSlug(tour, 'fr')).toBe('decouverte-du-lac-lak-1-jour')
	})

	it('should derive hybrid {tourId}-{nameSlug} when tourId is provided', () => {
		const dayTour: Tour = {
			tourId: 'DL-01',
			tourName: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
			},
		}

		expect(getTourSlug(dayTour, 'vi')).toBe('dl-01-kham-pha-ho-lak-1-ngay')
		expect(getTourSlug(dayTour, 'en')).toBe('dl-01-lak-lake-1-day-discovery')

		const highlandTour: Tour = {
			tourId: 'HL-03',
			tourName: {
				vi: 'Hành Trình Đại Ngàn 3 Ngày',
				fr: 'Voyage au Coeur des Hauts Plateaux',
			},
		}

		expect(getTourSlug(highlandTour, 'vi')).toBe('hl-03-hanh-trinh-dai-ngan-3-ngay')
		expect(getTourSlug(highlandTour, 'fr')).toBe('hl-03-voyage-au-coeur-des-hauts-plateaux')
	})

	it('should fallback to tourId if neither tourSlug nor tourName exist', () => {
		const tour: Tour = {
			tourId: 'DL-01',
		}

		expect(getTourSlug(tour, 'vi')).toBe('dl-01')
	})

	it('should derive virtual slug for blog posts from title', () => {
		const blog = {
			title: {
				vi: 'Kinh Nghiệm Phượt Buôn Ma Thuột',
				en: 'Buon Ma Thuot Travel Tips',
			},
		}
		expect(getBlogSlug(blog, 'vi')).toBe('kinh-nghiem-phuot-buon-ma-thuot')
		expect(getBlogSlug(blog, 'en')).toBe('buon-ma-thuot-travel-tips')
	})

	describe('matchesTourSlug matching engine', () => {
		const sampleTour: Tour = {
			tourId: 'DL-01',
			tourName: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
				fr: 'Découverte du Lac Lắk 1 Jour',
			},
		}

		it('should match direct tourId in any case', () => {
			expect(matchesTourSlug(sampleTour, 'dl-01')).toBe(true)
			expect(matchesTourSlug(sampleTour, 'DL-01')).toBe(true)
		})

		it('should match hybrid slug format {tourId}-{nameSlug}', () => {
			expect(matchesTourSlug(sampleTour, 'dl-01-kham-pha-ho-lak-1-ngay')).toBe(true)
			expect(matchesTourSlug(sampleTour, 'dl-01-lak-lake-1-day-discovery')).toBe(true)
			expect(matchesTourSlug(sampleTour, 'dl-01-decouverte-du-lac-lak-1-jour')).toBe(true)
		})

		it('should match pure localized name slug if url lacks prefix', () => {
			expect(matchesTourSlug(sampleTour, 'kham-pha-ho-lak-1-ngay')).toBe(true)
			expect(matchesTourSlug(sampleTour, 'lak-lake-1-day-discovery')).toBe(true)
		})

		it('should match prefix when title changes in CMS', () => {
			expect(matchesTourSlug(sampleTour, 'dl-01-new-renamed-tour-title')).toBe(true)
		})

		it('should not match unrelated tour slugs', () => {
			expect(matchesTourSlug(sampleTour, 'dl-02-thac-dray-nur')).toBe(false)
			expect(matchesTourSlug(sampleTour, 'hl-01-tour-tay-nguyen')).toBe(false)
		})
	})
})
