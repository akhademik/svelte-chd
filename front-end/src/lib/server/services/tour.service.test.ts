import { describe, it, expect, vi, beforeEach } from 'vitest'
import { matchesTourSlug, TourService } from './tour.service'
import { sanityClient } from '$lib/server/sanity/client'
import type { Tour } from '$lib/types/tour.type'

vi.mock('$lib/server/sanity/client', () => ({
	sanityClient: {
		fetch: vi.fn(),
	},
}))

describe('tour.service', () => {
	const mockTour = {
		_id: 'tour-1',
		tour_id: 'DL-01',
		tour_name: {
			vi: 'Khám Phá Hồ Lắk 1 Ngày',
			en: 'Discover Lak Lake 1 Day',
			fr: 'Découverte du Lac Lắk 1 Jour',
		},
		tour_duration: {
			vi: '1 ngày',
			en: '1 Day',
			fr: '1 Jour',
		},
		tour_price: { pax1: 1000000, pax2: 800000 },
	} as unknown as Tour

	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('matchesTourSlug', () => {
		it('returns false for empty tour or target slug', () => {
			expect(matchesTourSlug(null as any, 'dl-01')).toBe(false)
			expect(matchesTourSlug(mockTour, '')).toBe(false)
		})

		it('matches direct tour_id in case-insensitive format', () => {
			expect(matchesTourSlug(mockTour, 'dl-01')).toBe(true)
			expect(matchesTourSlug(mockTour, 'DL-01')).toBe(true)
		})

		it('matches virtual slug containing tour_id and localized name', () => {
			expect(matchesTourSlug(mockTour, 'dl-01-kham-pha-ho-lak-1-ngay')).toBe(true)
			expect(matchesTourSlug(mockTour, 'dl-01-discover-lak-lake-1-day')).toBe(true)
		})

		it('matches pure title slug without tour_id prefix', () => {
			expect(matchesTourSlug(mockTour, 'kham-pha-ho-lak-1-ngay')).toBe(true)
			expect(matchesTourSlug(mockTour, 'discover-lak-lake-1-day')).toBe(true)
		})

		it('matches slug starting with tour_id prefix', () => {
			expect(matchesTourSlug(mockTour, 'dl-01-any-custom-slug')).toBe(true)
		})

		it('returns false for unrelated slug', () => {
			expect(matchesTourSlug(mockTour, 'hl-02-mang-den-forest')).toBe(false)
		})
	})

	describe('TourService methods', () => {
		it('fetches tours by type and maps raw sanity documents', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValueOnce([
				{
					_id: 'doc-1',
					tour_id: 'DL-01',
					tour_name: { vi: 'Hồ Lắk' },
				},
			])

			const tours = await TourService.getToursByType('day-tours')
			expect(tours.length).toBe(1)
			expect(tours[0].tour_id).toBe('DL-01')
			expect(tours[0].best_sell).toBe(false)
		})

		it('finds a tour by matching virtual slug within category', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValue([
				{
					_id: 'doc-1',
					tour_id: 'DL-01',
					tour_name: { vi: 'Khám Phá Hồ Lắk 1 Ngày' },
				},
				{
					_id: 'doc-2',
					tour_id: 'DL-02',
					tour_name: { vi: 'Thác Dray Nur' },
				},
			])

			const found = await TourService.getTourBySlug('dl-01-kham-pha-ho-lak-1-ngay', 'day-tours')
			expect(found).not.toBeNull()
			expect(found?.tour_id).toBe('DL-01')
		})

		it('falls back to search across all categories if not found in given type', async () => {
			;(vi.mocked(sanityClient.fetch) as any).mockResolvedValue([
				{
					_id: 'doc-hl',
					tour_id: 'HL-01',
					tour_name: { vi: 'Măng Đen 3 Ngày' },
				},
			])

			const found = await TourService.getTourBySlug('hl-01', 'day-tours')
			expect(found).not.toBeNull()
			expect(found?.tour_id).toBe('HL-01')
		})
	})
})
