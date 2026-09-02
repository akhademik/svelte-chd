import type { Locales } from './i18n/i18n-types'

// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
