import { describe, it, expect } from 'vitest'
import { mapSanityToTour, mapSanityToTours } from './tour.mapper'

describe('tour.mapper', () => {
	it('maps raw Sanity tour document into canonical Tour domain model with defaults', () => {
		const raw = {
			_id: 'tour-123',
			tour_id: 'DL-01',
			tour_name: { vi: 'Hồ Lắk', en: 'Lak Lake' },
			tour_price: { pax1: 1000000, pax2: 800000 },
		}

		const mapped = mapSanityToTour(raw)

		expect(mapped._id).toBe('tour-123')
		expect(mapped.tour_id).toBe('DL-01')
		expect(mapped.best_sell).toBe(false)
		expect(mapped.contact_for_price).toBe(false)
		expect(mapped.img_tour).toEqual([])
		expect(mapped.tour_highlights).toEqual([])
		expect(mapped.tour_includes).toEqual([])
		expect(mapped.tour_tags).toEqual([])
	})

	it('preserves existing flags and complex nested attributes including good_to_know', () => {
		const raw = {
			_id: 'tour-456',
			tour_id: 'HL-02',
			best_sell: true,
			contact_for_price: true,
			tour_duration: '3 Days 2 Nights',
			tour_highlights: [{ vi: 'Điểm 1' }],
			tour_tags: [{ title: { vi: 'Tây Nguyên' } }],
			img_tour: [{ asset: { _ref: 'img-1' } }],
			good_to_know: {
				whatToPack: {
					icon: '🎒',
					title: { vi: 'Áo khoác' },
					description: { vi: 'Nên mang áo khoác mỏng' },
				},
			},
		}

		const mapped = mapSanityToTour(raw)

		expect(mapped.best_sell).toBe(true)
		expect(mapped.contact_for_price).toBe(true)
		expect(mapped.tour_duration).toBe('3 Days 2 Nights')
		expect(mapped.tour_highlights?.length).toBe(1)
		expect(mapped.tour_tags?.length).toBe(1)
		expect(mapped.img_tour?.length).toBe(1)
		expect(mapped.good_to_know?.whatToPack?.icon).toBe('🎒')
	})

	it('handles null, undefined, and non-array raw inputs gracefully', () => {
		expect(mapSanityToTour(null)).toBeNull()
		expect(mapSanityToTour(undefined)).toBeUndefined()
		expect(mapSanityToTours(null as any)).toEqual([])
		expect(mapSanityToTours(undefined as any)).toEqual([])
	})

	it('maps an array of raw documents filtering out null items', () => {
		const list = [{ _id: '1', tour_id: 'T1' }, null, { _id: '2', tour_id: 'T2', best_sell: true }]
		const mapped = mapSanityToTours(list)
		expect(mapped.length).toBe(2)
		expect(mapped[0].tour_id).toBe('T1')
		expect(mapped[1].tour_id).toBe('T2')
		expect(mapped[1].best_sell).toBe(true)
	})
})
