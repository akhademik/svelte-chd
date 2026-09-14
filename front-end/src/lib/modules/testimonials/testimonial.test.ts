import { describe, it, expect } from 'vitest'
import { mapTestimonial, mapTestimonials } from './testimonial'
import type { Testimonial } from '$lib/types/testimonial.type'

describe('testimonial mapping utilities', () => {
	it('should map raw testimonial to TestimonialViewModel correctly', () => {
		const raw: Testimonial = {
			_id: 't-1',
			name: 'John Doe',
			review_title: 'Amazing Tour',
			review_content: 'Best experience in Central Highlands.',
			stars: 5,
			avatar: 'https://example.com/avatar.jpg',
			country: 'Australia',
			url: 'https://tripadvisor.com/review/123',
			date_review: '2026-05-10',
		}

		const vm = mapTestimonial(raw)
		expect(vm.id).toBe('t-1')
		expect(vm.authorName).toBe('John Doe')
		expect(vm.title).toBe('Amazing Tour')
		expect(vm.quote).toBe('Best experience in Central Highlands.')
		expect(vm.rating).toBe(5)
		expect(vm.authorAvatar).toBe('https://example.com/avatar.jpg')
		expect(vm.authorLocation).toBe('Australia')
		expect(vm.sourceUrl).toBe('https://tripadvisor.com/review/123')
		expect(vm.date).toBe('2026-05-10')
	})

	it('should provide default values when optional fields are missing', () => {
		const raw: Testimonial = {
			name: 'Jane',
			review_content: 'Great!',
		}

		const vm = mapTestimonial(raw)
		expect(vm.id).toBe('Jane-')
		expect(vm.authorName).toBe('Jane')
		expect(vm.quote).toBe('Great!')
		expect(vm.title).toBe('')
		expect(vm.rating).toBe(5)
		expect(vm.authorAvatar).toBe('')
		expect(vm.authorLocation).toBe('')
	})

	it('should map an array of testimonials', () => {
		const list: Testimonial[] = [
			{ _id: '1', name: 'Alice', review_content: 'Nice' },
			{ _id: '2', name: 'Bob', review_content: 'Good' },
		]

		const result = mapTestimonials(list)
		expect(result.length).toBe(2)
		expect(result[0].authorName).toBe('Alice')
		expect(result[1].authorName).toBe('Bob')
	})

	it('should handle undefined or non-array inputs gracefully', () => {
		expect(mapTestimonials()).toEqual([])
		expect(mapTestimonials(undefined)).toEqual([])
	})
})
