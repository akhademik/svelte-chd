import { describe, it, expect, vi } from 'vitest'
import { get_length_and_index, tour_by_index, redirect_to_home } from './navigation'
import type { Tour } from '$lib/types/tour.type'
import { goto } from '$app/navigation'

vi.mock('$app/navigation', () => ({
	goto: vi.fn(),
}))

describe('navigation utils', () => {
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

	it('should redirect to home with specified locale', () => {
		redirect_to_home('fr')
		expect(goto).toHaveBeenCalledWith('/fr')

		redirect_to_home()
		expect(goto).toHaveBeenCalledWith('/en')
	})
})
