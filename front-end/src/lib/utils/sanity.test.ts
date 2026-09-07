import { describe, it, expect } from 'vitest'
import { get_tour_slug, get_blog_slug, get_length_and_index, tour_by_index } from './sanity'
import { matchesTourSlug } from '$lib/server/services/tour.service'
import type { Tour } from '$lib/types/tour.type'

describe('sanity utils & fallback slug parsing', () => {
	it('should return empty string when tour or slug is undefined', () => {
		expect(get_tour_slug(null as unknown as Tour)).toBe('')
		expect(get_tour_slug({} as Tour)).toBe('')
	})

	it('should handle raw string slugs', () => {
		const tour = { tour_slug: 'lak-lake-adventure' } as unknown as Tour
		expect(get_tour_slug(tour)).toBe('lak-lake-adventure')
	})

	it('should handle standard Sanity slug object { current: string }', () => {
		const tour = { tour_slug: { current: 'dray-nur-waterfall' } } as unknown as Tour
		expect(get_tour_slug(tour)).toBe('dray-nur-waterfall')
	})

	it('should fallback to localized slug when nested by language', () => {
		const tour = {
			tour_slug: {
				vn: { current: 'kham-pha-ho-lak' },
				en: { current: 'lak-lake-discovery' },
				fr: { current: 'decouverte-du-lac-lak' },
			},
		} as unknown as Tour

		expect(get_tour_slug(tour, 'vn')).toBe('kham-pha-ho-lak')
		expect(get_tour_slug(tour, 'vi')).toBe('kham-pha-ho-lak')
		expect(get_tour_slug(tour, 'fr')).toBe('decouverte-du-lac-lak')
		expect(get_tour_slug(tour, 'en')).toBe('lak-lake-discovery')
		expect(get_tour_slug(tour, 'de')).toBe('lak-lake-discovery') // falls back to en
	})

	it('should support direct string slugs per language', () => {
		const tour = {
			tour_slug: {
				vn: 'kham-pha-ho-lak',
				en: 'lak-lake-discovery',
			},
		} as unknown as Tour

		expect(get_tour_slug(tour, 'vi')).toBe('kham-pha-ho-lak')
		expect(get_tour_slug(tour, 'en')).toBe('lak-lake-discovery')
	})

	it('should derive virtual slug from tour_name when tour_slug is absent', () => {
		const tour = {
			tour_name: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
				fr: 'Découverte du Lac Lắk 1 Jour',
			},
		} as unknown as Tour

		expect(get_tour_slug(tour, 'vi')).toBe('kham-pha-ho-lak-1-ngay')
		expect(get_tour_slug(tour, 'en')).toBe('lak-lake-1-day-discovery')
		expect(get_tour_slug(tour, 'fr')).toBe('decouverte-du-lac-lak-1-jour')
	})

	it('should derive hybrid {tour_id}-{nameSlug} when tour_id is provided', () => {
		const dayTour = {
			tour_id: 'DL-01',
			tour_name: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
			},
		} as unknown as Tour

		expect(get_tour_slug(dayTour, 'vi')).toBe('dl-01-kham-pha-ho-lak-1-ngay')
		expect(get_tour_slug(dayTour, 'en')).toBe('dl-01-lak-lake-1-day-discovery')

		const highlandTour = {
			tour_id: 'HL-03',
			tour_name: {
				vi: 'Hành Trình Đại Ngàn 3 Ngày',
				fr: 'Voyage au Coeur des Hauts Plateaux',
			},
		} as unknown as Tour

		expect(get_tour_slug(highlandTour, 'vi')).toBe('hl-03-hanh-trinh-dai-ngan-3-ngay')
		expect(get_tour_slug(highlandTour, 'fr')).toBe('hl-03-voyage-au-coeur-des-hauts-plateaux')
	})

	it('should fallback to tour_id if neither tour_slug nor tour_name exist', () => {
		const tour = {
			tour_id: 'DL-01',
		} as unknown as Tour

		expect(get_tour_slug(tour, 'vi')).toBe('DL-01')
	})

	it('should derive virtual slug for blog posts from title', () => {
		const blog = {
			title: {
				vi: 'Kinh Nghiệm Phượt Buôn Ma Thuột',
				en: 'Buon Ma Thuot Travel Tips',
			},
		}
		expect(get_blog_slug(blog, 'vi')).toBe('kinh-nghiem-phuot-buon-ma-thuot')
		expect(get_blog_slug(blog, 'en')).toBe('buon-ma-thuot-travel-tips')
	})

	it('should get tour by index correctly', () => {
		const tours = [
			{ tour_slug: { current: 'tour-1' } },
			{ tour_slug: { current: 'tour-2' } },
		] as Tour[]

		expect(tour_by_index(tours, 1)?.tour_slug).toEqual({ current: 'tour-2' })
		expect(tour_by_index(tours, 99)?.tour_slug).toEqual({ current: 'tour-1' })
	})

	it('should calculate length and index correctly', () => {
		const tours = [
			{ tour_slug: { current: 'tour-1' } },
			{ tour_slug: { current: 'tour-2' } },
		] as Tour[]

		const res = get_length_and_index(tours, 'tour-2')
		expect(res.length).toBe(1)
		expect(res.index).toBe(1)

		const notFound = get_length_and_index(tours, 'non-existent')
		expect(notFound.index).toBe(0)
	})

	describe('matchesTourSlug matching engine', () => {
		const sampleTour = {
			tour_id: 'DL-01',
			tour_name: {
				vi: 'Khám Phá Hồ Lắk 1 Ngày',
				en: 'Lak Lake 1-Day Discovery',
				fr: 'Découverte du Lac Lắk 1 Jour',
			},
		} as unknown as Tour

		it('should match direct tour_id in any case', () => {
			expect(matchesTourSlug(sampleTour, 'dl-01')).toBe(true)
			expect(matchesTourSlug(sampleTour, 'DL-01')).toBe(true)
		})

		it('should match hybrid slug format {tour_id}-{nameSlug}', () => {
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
