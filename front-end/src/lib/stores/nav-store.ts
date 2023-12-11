import { writable } from 'svelte/store'

const set_deg_store = () => {
	const { subscribe, update } = writable(0)
	return {
		subscribe,
		turn: () => update(deg => (deg += 0.25)),
	}
}
const set_mobile_store = () => {
	const { subscribe, update } = writable(false)
	return {
		subscribe,
		toggle: () => update(is_open => !is_open),
	}
}

const set_animate_hidden_store = () => {
	const { subscribe, set } = writable(false)
	return {
		subscribe,
		set,
	}
}

export const nav_deg = set_deg_store()
export const nav_mobile = set_mobile_store()
export const nav_animate_hidden = set_animate_hidden_store()
