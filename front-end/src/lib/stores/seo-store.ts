import { writable } from 'svelte/store'

const DEFAULT_TITLE = 'CHD Travel - Vietnam Highlands & Day Tours'
const DEFAULT_DESC =
	'Discover the vibrant culture and rich traditions of Vietnam’s highlands with our travel agency. Experience the lifestyle of the minority people, participate in their customs, and explore breathtaking landscapes.'
const DEFAULT_KEYWORDS =
	'Vietnam Travel Agency, Highlands Tour, Minority People Lifestyle, Cultural Immersion, Traditional Ceremonies, Sustainable Tourism, Responsible Tourism, Scenic Hikes, Ethnic Minorities, Local Folklore, Breathtaking Landscapes, Vietnam Highlands, Rural Life Experience'

export const seoTitle = writable('')
export const seoDescription = writable('')
export const seoKeywords = writable('')
export const seoOgImage = writable('')

export const setSeo = (
	title?: string,
	description?: string,
	keywords?: string,
	ogImage?: string
) => {
	if (title && title !== 'default') {
		seoTitle.set(title)
	} else if (title === 'default') {
		seoTitle.set('')
	}
	if (description !== undefined) {
		seoDescription.set(description || '')
	}
	if (keywords !== undefined) {
		seoKeywords.set(keywords || '')
	}
	if (ogImage !== undefined) {
		seoOgImage.set(ogImage || '')
	}
}

export { DEFAULT_DESC, DEFAULT_KEYWORDS, DEFAULT_TITLE }
