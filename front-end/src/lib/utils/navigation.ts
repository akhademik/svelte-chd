import { goto } from '$app/navigation'
import type { Tour } from '$lib/types/tour.type'
import { getTourSlug } from './slug'

export const redirectToHome = (locale: string = 'en') => {
	goto(`/${locale}`)
}

export const tourByIndex = (tours: Tour[], index: number) => {
	if (!tours || !tours[index]) return tours?.[0]
	const targetSlug = getTourSlug(tours[index])
	const tour = tours.find((t: Tour) => {
		const s = getTourSlug(t)
		return s === targetSlug
	})
	return tour || tours[index]
}

export const getLengthAndIndex = (tours: Tour[], slug: string) => {
	if (!tours || tours.length === 0) return { length: 0, index: 0 }
	const slugsArray = tours.map(tour => getTourSlug(tour))
	const length = slugsArray.length - 1
	const foundIndex = slugsArray.indexOf(slug)
	const index = foundIndex > -1 ? foundIndex : 0
	return { length, index }
}
