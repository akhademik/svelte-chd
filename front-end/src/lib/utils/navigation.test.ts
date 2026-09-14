import { describe, it, expect, vi } from 'vitest'
import { getLengthAndIndex, tourByIndex, redirectToHome } from './navigation'
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

		expect(tourByIndex(tours, 1)?.tour_slug).toEqual({ current: 'tour-2' })
		expect(tourByIndex(tours, 99)?.tour_slug).toEqual({ current: 'tour-1' })
	})

	it('should calculate length and index correctly', () => {
		const tours = [
			{ tour_slug: { current: 'tour-1' } },
			{ tour_slug: { current: 'tour-2' } },
		] as Tour[]

		const res = getLengthAndIndex(tours, 'tour-2')
		expect(res.length).toBe(1)
		expect(res.index).toBe(1)

		const notFound = getLengthAndIndex(tours, 'non-existent')
		expect(notFound.index).toBe(0)
	})

	it('should redirect to home with specified locale', () => {
		redirectToHome('fr')
		expect(goto).toHaveBeenCalledWith('/fr')

		redirectToHome()
		expect(goto).toHaveBeenCalledWith('/en')
	})
})
