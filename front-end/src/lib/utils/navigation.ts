import { goto } from '$app/navigation'
import type { Tour } from '$lib/types/tour.type'
import { get_tour_slug } from './slug'

export const redirect_to_home = (locale: string = 'en') => {
	goto(`/${locale}`)
}

export const tour_by_index = (tours: Tour[], index: number) => {
	if (!tours || !tours[index]) return tours?.[0]
	const target_slug = get_tour_slug(tours[index])
	const tour = tours.find((t: Tour) => {
		const s = get_tour_slug(t)
		return s === target_slug
	})
	return tour || tours[index]
}

export const get_length_and_index = (tours: Tour[], slug: string) => {
	if (!tours || tours.length === 0) return { length: 0, index: 0 }
	const slugs_array = tours.map(tour => get_tour_slug(tour))
	const length = slugs_array.length - 1
	const found_index = slugs_array.indexOf(slug)
	const index = found_index > -1 ? found_index : 0
	return { length, index }
}
