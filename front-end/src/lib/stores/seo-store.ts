import { writable } from 'svelte/store'

export interface SeoState {
	title: string
	description: string
	keywords: string
	ogImage?: string
	ogType?: string
}

const DEFAULT_TITLE = 'CHD Travel - Vietnam Highlands & Day Tours'
const DEFAULT_DESC =
	'Discover the vibrant culture and rich traditions of Vietnam’s highlands with our travel agency. Experience the lifestyle of the minority people, participate in their customs, and explore breathtaking landscapes.'
const DEFAULT_KEYWORDS =
	'Vietnam Travel Agency, Highlands Tour, Minority People Lifestyle, Cultural Immersion, Traditional Ceremonies, Sustainable Tourism, Responsible Tourism, Scenic Hikes, Ethnic Minorities, Local Folklore, Breathtaking Landscapes, Vietnam Highlands, Rural Life Experience'

export const seo_title = writable('')
export const seo_description = writable('')
export const seo_keywords = writable('')
export const seo_og_image = writable('')

export const set_seo = (
	title?: string,
	description?: string,
	keywords?: string,
	ogImage?: string
) => {
	if (!title || title === 'default') {
		seo_title.set('')
	} else {
		seo_title.set(title)
	}
	seo_description.set(description || '')
	seo_keywords.set(keywords || '')
	seo_og_image.set(ogImage || '')
}

export { DEFAULT_DESC, DEFAULT_KEYWORDS, DEFAULT_TITLE }
