import { writable } from 'svelte/store'

export interface ExchangeRates {
	USD: number
	EUR: number
	[key: string]: number
}

const defaultRates: ExchangeRates = {
	USD: 0.00003841,
	EUR: 0.00003317,
}

export const exchange_rates_store = (() => {
	const { subscribe, set, update } = writable<ExchangeRates>(defaultRates)

	return {
		subscribe,
		setRates: (rates: ExchangeRates) => {
			if (rates && Object.keys(rates).length > 0) {
				set({ ...defaultRates, ...rates })
			}
		},
		getRates: () => {
			let current = defaultRates
			subscribe(val => (current = val))()
			return current
		},
		update,
	}
})()
