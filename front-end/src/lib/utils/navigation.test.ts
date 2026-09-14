import { describe, it, expect, vi } from 'vitest'
import { getLengthAndIndex, tourByIndex, redirectToHome } from './navigation'
import type { Tour } from '$lib/types/tour.type'
import { goto } from '$app/navigation'

vi.mock('$app/navigation', () => ({
	goto: vi.fn(),
}))

describe('navigation utils', () => {
	it('should get tour by index correctly', () => {
		const tours: Tour[] = [{ tourSlug: { current: 'tour-1' } }, { tourSlug: { current: 'tour-2' } }]

		expect(tourByIndex(tours, 1)?.tourSlug).toEqual({ current: 'tour-2' })
		expect(tourByIndex(tours, 99)?.tourSlug).toEqual({ current: 'tour-1' })
	})

	it('should calculate length and index correctly', () => {
		const tours: Tour[] = [{ tourSlug: { current: 'tour-1' } }, { tourSlug: { current: 'tour-2' } }]

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
