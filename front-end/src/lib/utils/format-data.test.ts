import { describe, it, expect } from 'vitest'
import {
	format_price,
	format_pax_no,
	format_price_object,
	format_review_date,
	slugify,
	get_category_slug,
	resolve_canonical_category,
	get_localized_field,
	has_localized_title,
	filter_localized_items,
} from './format-data'
import type { Tour } from '$lib/types/tour.type'

describe('format-data utilities', () => {
	it('should format price correctly for Vietnamese Dong (vi / vn)', () => {
		expect(format_price(1500000, 'vi')).toBe('1.500k')
		expect(format_price(500000, 'vi')).toBe('500k')
		expect(format_price(1500000, 'vn')).toBe('1.500k')
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

	it('should format review dates according to locale', () => {
		expect(format_review_date('07-2026', 'vn')).toBe('Tháng 7, 2026')
		expect(format_review_date('07-2026', 'en')).toBe('Jul 2026')
		expect(format_review_date('07-2026', 'fr')).toBe('Juil 2026')
		expect(format_review_date('2026-08', 'vn')).toBe('Tháng 8, 2026')
		expect(format_review_date('2026-08', 'en')).toBe('Aug 2026')
		expect(format_review_date('2026-08', 'fr')).toBe('Août 2026')
		expect(format_review_date('', 'en')).toBe('')
	})

	describe('slugify & category helpers', () => {
		it('should slugify Vietnamese strings with diacritics', () => {
			expect(slugify('Khám Phá Hồ Lắk 1 Ngày')).toBe('kham-pha-ho-lak-1-ngay')
			expect(slugify('Đắk Lắk - Thác Dray Nur & Dray Sap')).toBe('dak-lak-thac-dray-nur-dray-sap')
			expect(slugify('  Tour Đi Bộ Rừng Yok Đôn  ')).toBe('tour-di-bo-rung-yok-don')
		})

		it('should slugify French and English strings', () => {
			expect(slugify('Découverte du Lac Lắk & Culture M’Nông')).toBe(
				'decouverte-du-lac-lak-culture-mnong'
			)
			expect(slugify('Lak Lake 1-Day Cultural Tour!')).toBe('lak-lake-1-day-cultural-tour')
		})

		it('should handle empty or undefined strings for slugify', () => {
			expect(slugify('')).toBe('')
			expect(slugify(undefined)).toBe('')
		})

		it('should get correct localized category slugs', () => {
			expect(get_category_slug('day-tours', 'vi')).toBe('tour-trong-ngay')
			expect(get_category_slug('day-tours', 'vn')).toBe('tour-trong-ngay')
			expect(get_category_slug('day-tours', 'en')).toBe('day-tours')
			expect(get_category_slug('day-tours', 'fr')).toBe('excursions')

			expect(get_category_slug('highland-tours', 'vi')).toBe('tour-tay-nguyen')
			expect(get_category_slug('highland-tours', 'en')).toBe('highland-tours')
			expect(get_category_slug('highland-tours', 'fr')).toBe('hauts-plateaux')
		})

		it('should resolve canonical categories from localized and legacy aliases', () => {
			expect(resolve_canonical_category('tour-trong-ngay')).toBe('day-tours')
			expect(resolve_canonical_category('tour-ngay')).toBe('day-tours')
			expect(resolve_canonical_category('excursions')).toBe('day-tours')
			expect(resolve_canonical_category('day-tours')).toBe('day-tours')

			expect(resolve_canonical_category('tour-tay-nguyen')).toBe('highland-tours')
			expect(resolve_canonical_category('tay-nguyen')).toBe('highland-tours')
			expect(resolve_canonical_category('hauts-plateaux')).toBe('highland-tours')
			expect(resolve_canonical_category('highland-tours')).toBe('highland-tours')

			expect(resolve_canonical_category('invalid-category')).toBeNull()
			expect(resolve_canonical_category(undefined)).toBeNull()
		})
	})

	describe('localization helpers', () => {
		it('should get localized field with proper priority and fallbacks', () => {
			const obj = { vi: 'Tiêu đề VN', en: 'English Title', fr: 'Titre Français' }
			expect(get_localized_field(obj, 'vi')).toBe('Tiêu đề VN')
			expect(get_localized_field(obj, 'vn')).toBe('Tiêu đề VN')
			expect(get_localized_field(obj, 'en')).toBe('English Title')
			expect(get_localized_field(obj, 'fr')).toBe('Titre Français')

			const fallbackObj = { en: 'Only English' }
			expect(get_localized_field(fallbackObj, 'vi')).toBe('Only English')
			expect(get_localized_field(null, 'vi', 'Default')).toBe('Default')
		})

		it('should check if entity has localized title', () => {
			expect(has_localized_title({ title: { vi: 'Bài viết' } }, 'vi')).toBe(true)
			expect(has_localized_title({ tour_name: { en: 'Tour' } }, 'fr')).toBe(true)
			expect(has_localized_title({ title: null }, 'vi')).toBe(false)
			expect(has_localized_title(undefined, 'vi')).toBe(false)
		})

		it('should filter items by localized title', () => {
			const items = [
				{ id: 1, title: { vi: 'Bài 1', en: 'Post 1' } },
				{ id: 2, title: null },
				{ id: 3, tour_name: { en: 'Tour 3' } },
			]
			const filtered = filter_localized_items(items, 'vi')
			expect(filtered.length).toBe(2)
			expect(filtered[0].id).toBe(1)
			expect(filtered[1].id).toBe(3)
		})
	})
})
