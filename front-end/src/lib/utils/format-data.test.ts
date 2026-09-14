import { describe, it, expect } from 'vitest'
import {
	formatPrice,
	formatPaxNo,
	formatPriceObject,
	formatReviewDate,
	getPaxTier,
	slugify,
	getCategorySlug,
	resolveCanonicalCategory,
	getLocalizedField,
	hasLocalizedTitle,
	filterLocalizedItems,
	getAvatarInitials,
} from './format-data'

import type { Tour } from '$lib/types/tour.type'

describe('format-data utilities', () => {
	it('should format price correctly for Vietnamese Dong (vi / vn)', () => {
		expect(formatPrice(1500000, 'vi')).toBe('1.500k')
		expect(formatPrice(500000, 'vi')).toBe('500k')
		expect(formatPrice(1500000, 'vn')).toBe('1.500k')
		expect(formatPrice(2330000, 'vi', { full: true })).toBe('2.330.000 VND')
		expect(formatPrice(4660000, 'vn', { full: true })).toBe('4.660.000 VND')
	})

	it('should format price correctly for USD (en)', () => {
		// default rate 0.000041
		expect(formatPrice(1000000, 'en')).toContain('$')
	})

	it('should format price correctly for EUR (fr)', () => {
		// default rate 0.000038
		expect(formatPrice(1000000, 'fr')).toContain('€')
	})

	it('should format pax ranges accurately', () => {
		expect(formatPaxNo('pax1')).toBe('01')
		expect(formatPaxNo('pax2')).toBe('02')
		expect(formatPaxNo('pax3_4')).toBe('03 - 04')
		expect(formatPaxNo('pax10_up')).toBe('> 10')
		expect(formatPaxNo('custom_key')).toBe('custom_key')
	})

	it('should map guest count correctly to pax tier keys', () => {
		expect(getPaxTier(1)).toBe('pax1')
		expect(getPaxTier(2)).toBe('pax2')
		expect(getPaxTier(3)).toBe('pax3_4')
		expect(getPaxTier(4)).toBe('pax3_4')
		expect(getPaxTier(5)).toBe('pax5_6')
		expect(getPaxTier(6)).toBe('pax5_6')
		expect(getPaxTier(7)).toBe('pax7_9')
		expect(getPaxTier(9)).toBe('pax7_9')
		expect(getPaxTier(10)).toBe('pax10_up')
		expect(getPaxTier(15)).toBe('pax10_up')
	})

	it('should sort price object entries numerically', () => {
		const dummyTour: Tour = {
			tourPrice: {
				_type: 'price_matrix',
				pax5_6: 500,
				pax1: 1000,
				pax2: 800,
			},
		}

		const sorted = formatPriceObject(dummyTour)
		expect(sorted[0][0]).toBe('pax1')
		expect(sorted[1][0]).toBe('pax2')
		expect(sorted[2][0]).toBe('pax5_6')
	})

	it('should format review dates according to locale', () => {
		expect(formatReviewDate('07-2026', 'vn')).toBe('Tháng 7, 2026')
		expect(formatReviewDate('07-2026', 'en')).toBe('Jul 2026')
		expect(formatReviewDate('07-2026', 'fr')).toBe('Juil 2026')
		expect(formatReviewDate('2026-08', 'vn')).toBe('Tháng 8, 2026')
		expect(formatReviewDate('2026-08', 'en')).toBe('Aug 2026')
		expect(formatReviewDate('2026-08', 'fr')).toBe('Août 2026')
		expect(formatReviewDate('', 'en')).toBe('')
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
			expect(getCategorySlug('day-tours', 'vi')).toBe('tour-trong-ngay')
			expect(getCategorySlug('day-tours', 'vn')).toBe('tour-trong-ngay')
			expect(getCategorySlug('day-tours', 'en')).toBe('day-tours')
			expect(getCategorySlug('day-tours', 'fr')).toBe('excursions')

			expect(getCategorySlug('highland-tours', 'vi')).toBe('tour-tay-nguyen')
			expect(getCategorySlug('highland-tours', 'en')).toBe('highland-tours')
			expect(getCategorySlug('highland-tours', 'fr')).toBe('hauts-plateaux')
		})

		it('should resolve canonical categories from localized and legacy aliases', () => {
			expect(resolveCanonicalCategory('tour-trong-ngay')).toBe('day-tours')
			expect(resolveCanonicalCategory('tour-ngay')).toBe('day-tours')
			expect(resolveCanonicalCategory('excursions')).toBe('day-tours')
			expect(resolveCanonicalCategory('day-tours')).toBe('day-tours')

			expect(resolveCanonicalCategory('tour-tay-nguyen')).toBe('highland-tours')
			expect(resolveCanonicalCategory('tay-nguyen')).toBe('highland-tours')
			expect(resolveCanonicalCategory('hauts-plateaux')).toBe('highland-tours')
			expect(resolveCanonicalCategory('highland-tours')).toBe('highland-tours')

			expect(resolveCanonicalCategory('invalid-category')).toBeNull()
			expect(resolveCanonicalCategory(undefined)).toBeNull()
		})
	})

	describe('localization helpers', () => {
		it('should get localized field with proper priority and fallbacks', () => {
			const obj = { vi: 'Tiêu đề VN', en: 'English Title', fr: 'Titre Français' }
			expect(getLocalizedField(obj, 'vi')).toBe('Tiêu đề VN')
			expect(getLocalizedField(obj, 'vn')).toBe('Tiêu đề VN')
			expect(getLocalizedField(obj, 'en')).toBe('English Title')
			expect(getLocalizedField(obj, 'fr')).toBe('Titre Français')

			const fallbackObj = { en: 'Only English' }
			expect(getLocalizedField(fallbackObj, 'vi')).toBe('Only English')
			expect(getLocalizedField(null, 'vi', 'Default')).toBe('Default')
		})

		it('should check if entity has localized title', () => {
			expect(hasLocalizedTitle({ title: { vi: 'Bài viết' } }, 'vi')).toBe(true)
			expect(hasLocalizedTitle({ tourName: { en: 'Tour' } }, 'fr')).toBe(true)
			expect(hasLocalizedTitle({ tour_name: { en: 'Tour Cũ' } }, 'fr')).toBe(true)
			expect(hasLocalizedTitle({ title: null }, 'vi')).toBe(false)
			expect(hasLocalizedTitle(undefined, 'vi')).toBe(false)
		})

		it('should filter items by localized title', () => {
			const items = [
				{ id: 1, title: { vi: 'Bài 1', en: 'Post 1' } },
				{ id: 2, title: null },
				{ id: 3, tourName: { en: 'Tour 3' } },
			]
			const filtered = filterLocalizedItems(items, 'vi')
			expect(filtered.length).toBe(2)
			expect(filtered[0].id).toBe(1)
			expect(filtered[1].id).toBe(3)
		})
	})

	describe('getAvatarInitials', () => {
		it('should handle multi-word names by taking first letter of first word and first letter of last word', () => {
			expect(getAvatarInitials('Nguyễn Văn Anh')).toBe('NA')
			expect(getAvatarInitials('John Doe')).toBe('JD')
			expect(getAvatarInitials('Mary Jane Watson')).toBe('MW')
		})

		it('should handle single-word names by taking the first 2 characters', () => {
			expect(getAvatarInitials('Nguyễn')).toBe('NG')
			expect(getAvatarInitials('John')).toBe('JO')
			expect(getAvatarInitials('Alex')).toBe('AL')
		})

		it('should handle single-character names', () => {
			expect(getAvatarInitials('A')).toBe('A')
		})

		it('should handle empty or whitespace-only strings with fallback question mark', () => {
			expect(getAvatarInitials('')).toBe('?')
			expect(getAvatarInitials('   ')).toBe('?')
			expect(getAvatarInitials(undefined)).toBe('?')
		})
	})
})
