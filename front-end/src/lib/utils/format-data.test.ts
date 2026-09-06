import { describe, it, expect } from 'vitest'
import { format_price, format_pax_no, format_price_object } from './format-data'
import type { Tour } from '$lib/types/tour.type'

describe('format-data utilities', () => {
	it('should format price correctly for Vietnamese Dong (vn)', () => {
		expect(format_price(1500000, 'vn')).toBe('1.500k')
		expect(format_price(500000, 'vn')).toBe('500k')
	})

	it('should format price correctly for USD (en)', () => {
		// default rate 0.000041
		expect(format_price(1000000, 'en')).toContain('$')
	})

	it('should format price correctly for EUR (fr)', () => {
		// default rate 0.000038
		expect(format_price(1000000, 'fr')).toContain('€')
	})

	it('should format pax ranges accurately', () => {
		expect(format_pax_no('pax1')).toBe('01')
		expect(format_pax_no('pax2')).toBe('02')
		expect(format_pax_no('pax3_4')).toBe('03 - 04')
		expect(format_pax_no('pax10_up')).toBe('> 10')
		expect(format_pax_no('custom_key')).toBe('custom_key')
	})

	it('should sort price object entries numerically', () => {
		const dummyTour = {
			tour_price: {
				_type: 'price_matrix',
				pax5_6: 500,
				pax1: 1000,
				pax2: 800,
			},
		} as unknown as Tour

		const sorted = format_price_object(dummyTour)
		expect(sorted[0][0]).toBe('pax1')
		expect(sorted[1][0]).toBe('pax2')
		expect(sorted[2][0]).toBe('pax5_6')
	})
})
