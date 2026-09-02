import { writable } from 'svelte/store'

export const seo_title = writable(' - 2023')
export const seo_description = writable('')
export const seo_keywords = writable('')

export const set_seo = (title: string, description?: string, keywords?: string) => {
	if (title === 'default') {
		seo_title.set(' - 2023')
	} else {
		seo_title.set(` - ${title}`)
	}
	seo_description.set(description || '')
	seo_keywords.set(keywords || '')
}
