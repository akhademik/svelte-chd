import { describe, it, expect } from 'vitest'
import { mapSanityToTour, mapSanityToTours } from './tour.mapper'

describe('tour.mapper', () => {
	it('maps raw Sanity tour document into canonical Tour domain model with defaults', () => {
		const raw = {
			_id: 'tour-123',
			tourId: 'DL-01',
			tourName: { vi: 'Hồ Lắk', en: 'Lak Lake' },
			tourPrice: { pax1: 1000000, pax2: 800000 },
		}

		const mapped = mapSanityToTour(raw)

		expect(mapped._id).toBe('tour-123')
		expect(mapped.tourId).toBe('DL-01')
		expect(mapped.bestSellerTour).toBe(false)
		expect(mapped.contactForPrice).toBe(false)
		expect(mapped.imgTour).toEqual([])
		expect(mapped.tourHighlights).toEqual([])
		expect(mapped.tourIncludes).toEqual([])
	})

	it('preserves existing flags and complex nested attributes including goodToKnow', () => {
		const raw = {
			_id: 'tour-456',
			tourId: 'HL-02',
			bestSellerTour: true,
			contactForPrice: true,
			tourDuration: '3 Days 2 Nights',
			tourHighlights: [{ vi: 'Điểm 1' }],
			imgTour: [{ asset: { _ref: 'img-1' } }],
			goodToKnow: {
				whatToPack: {
					title: { vi: 'Áo khoác' },
					description: { vi: 'Nên mang áo khoác mỏng' },
				},
			},
		}

		const mapped = mapSanityToTour(raw)

		expect(mapped.bestSellerTour).toBe(true)
		expect(mapped.contactForPrice).toBe(true)
		expect(mapped.tourDuration).toBe('3 Days 2 Nights')
		expect(mapped.tourHighlights?.length).toBe(1)
		expect(mapped.imgTour?.length).toBe(1)
		expect(mapped.goodToKnow?.whatToPack?.title?.vi).toBe('Áo khoác')
	})

	it('handles legacy snake_case raw Sanity fields seamlessly', () => {
		const raw = {
			_id: 'tour-legacy',
			tour_id: 'DL-99',
			best_sell: true,
			contact_for_price: true,
			tour_name: { vi: 'Tour Cũ' },
		}

		const mapped = mapSanityToTour(raw)
		expect(mapped.tourId).toBe('DL-99')
		expect(mapped.bestSellerTour).toBe(true)
		expect(mapped.contactForPrice).toBe(true)
		expect(mapped.tourName?.vi).toBe('Tour Cũ')
	})

	it('handles null, undefined, and non-array raw inputs gracefully', () => {
		expect(mapSanityToTour(null)).toBeNull()
		expect(mapSanityToTour(undefined)).toBeNull()
		expect(mapSanityToTours(null)).toEqual([])
		expect(mapSanityToTours(undefined)).toEqual([])
	})

	it('maps an array of raw documents filtering out null items', () => {
		const list = [
			{ _id: '1', tourId: 'T1' },
			null,
			{ _id: '2', tourId: 'T2', bestSellerTour: true },
		]
		const mapped = mapSanityToTours(list)
		expect(mapped.length).toBe(2)
		expect(mapped[0].tourId).toBe('T1')
		expect(mapped[1].tourId).toBe('T2')
		expect(mapped[1].bestSellerTour).toBe(true)
	})
})
