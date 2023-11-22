import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals: { locale } }) => {
	// extracted locale get from user preference or default in hooks.server.ts
	return { locale }
}
