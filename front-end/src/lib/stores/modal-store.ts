import type { Tour } from '$lib/types/tour.type'
import { writable } from 'svelte/store'

export interface TourModalState {
	isOpen: boolean
	tour: Tour | null
}

export const tour_modal = (() => {
	const { subscribe, set, update } = writable<TourModalState>({
		isOpen: false,
		tour: null,
	})

	return {
		subscribe,
		open: (tour: Tour) => set({ isOpen: true, tour }),
		close: () => update(state => ({ ...state, isOpen: false })),
	}
})()

export interface BlogModalState {
	isOpen: boolean
	post: any | null
}

export const blog_modal = (() => {
	const { subscribe, set, update } = writable<BlogModalState>({
		isOpen: false,
		post: null,
	})

	return {
		subscribe,
		open: (post: any) => set({ isOpen: true, post }),
		close: () => update(state => ({ ...state, isOpen: false })),
	}
})()
