import { dev } from '$app/environment'

export const logger = {
	log: (...args: unknown[]) => {
		if (dev) {
			console.log('[DEV]', ...args)
		}
	},
	info: (...args: unknown[]) => {
		if (dev) {
			console.info('[DEV INFO]', ...args)
		}
	},
	warn: (...args: unknown[]) => {
		if (dev) {
			console.warn('[DEV WARN]', ...args)
		}
	},
	error: (...args: unknown[]) => {
		if (dev) {
			console.error('[DEV ERROR]', ...args)
		}
	},
}
