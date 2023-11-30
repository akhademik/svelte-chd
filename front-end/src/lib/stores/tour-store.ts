import type { Tour } from '$lib/types/tour.type'
import { writable } from 'svelte/store'

const set_tours_store = () => {
	const { subscribe, set } = writable<Tour[]>([])
	return { subscribe, set }
}

const set_tour_index = () => {
	const { subscribe, set, update } = writable(0)
	return { subscribe, set, update }
}

export const tours_store = set_tours_store()
export const tour_index_store = set_tour_index()
