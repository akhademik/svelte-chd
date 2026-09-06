import { describe, it, expect } from 'vitest'
import { get_tour_slug, get_length_and_index, tour_by_index } from './sanity'
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
		expect(get_tour_slug(tour, 'fr')).toBe('decouverte-du-lac-lak')
		expect(get_tour_slug(tour, 'en')).toBe('lak-lake-discovery')
		expect(get_tour_slug(tour, 'de')).toBe('lak-lake-discovery') // falls back to en
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
})
