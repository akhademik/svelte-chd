import { writable } from 'svelte/store'

const set_tour_index = () => {
	const { subscribe, set, update } = writable(0)
	return { subscribe, set, update }
}

export const tour_index_store = set_tour_index()
