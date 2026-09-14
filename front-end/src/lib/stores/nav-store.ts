import { writable } from 'svelte/store'

const createDegStore = () => {
	const { subscribe, update } = writable(0)
	return {
		subscribe,
		turn: () => update(deg => (deg += 0.25)),
	}
}

const createMobileStore = () => {
	const { subscribe, update } = writable(false)
	return {
		subscribe,
		toggle: () => update(isOpen => !isOpen),
	}
}

const createAnimateHiddenStore = () => {
	const { subscribe, set } = writable(false)
	return {
		subscribe,
		set,
	}
}

const createLocaleTransitioningStore = () => {
	const { subscribe, set } = writable(false)
	return {
		subscribe,
		set,
	}
}

export const navDeg = createDegStore()
export const navMobile = createMobileStore()
export const navAnimateHidden = createAnimateHiddenStore()
export const isLocaleTransitioning = createLocaleTransitioningStore()
