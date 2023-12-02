import type { Page } from '@sveltejs/kit'

export const get_base_url = (page: Page) => {
	const current_url = page.url.pathname
	const url = current_url.substring(0, current_url.lastIndexOf('/') + 1)
	return url
}
