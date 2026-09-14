import { goto } from '$app/navigation'
import type { Tour } from '$lib/types/tour.type'
import { getTourSlug } from './slug'

export const redirectToHome = (locale: string = 'en') => {
	goto(`/${locale}`)
}

export const tourByIndex = (tours: Tour[], index: number) => {
	if (!tours || !tours[index]) return tours?.[0]
	const target_slug = getTourSlug(tours[index])
	const tour = tours.find((t: Tour) => {
		const s = getTourSlug(t)
		return s === target_slug
	})
	return tour || tours[index]
}

export const getLengthAndIndex = (tours: Tour[], slug: string) => {
	if (!tours || tours.length === 0) return { length: 0, index: 0 }
	const slugs_array = tours.map(tour => getTourSlug(tour))
	const length = slugs_array.length - 1
	const found_index = slugs_array.indexOf(slug)
	const index = found_index > -1 ? found_index : 0
	return { length, index }
}
