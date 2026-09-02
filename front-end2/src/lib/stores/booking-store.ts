import { writable } from 'svelte/store'

export interface BookingModalState {
	isOpen: boolean
	tourName: string
}

export const booking_modal = (() => {
	const { subscribe, set, update } = writable<BookingModalState>({
		isOpen: false,
		tourName: '',
	})

	return {
		subscribe,
		open: (tourName: string) => set({ isOpen: true, tourName }),
		close: () => update(state => ({ ...state, isOpen: false })),
	}
})()
