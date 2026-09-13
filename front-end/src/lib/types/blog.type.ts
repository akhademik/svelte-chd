import type { GalleryImage, PortableTextBlock } from '$lib/utils/gallery'

export interface BlogPost {
	_id: string
	title: {
		vi?: string
		vn?: string
		en?: string
		fr?: string
	}
	slug: {
		current?: string
		vi?: { current: string }
		vn?: { current: string }
		en?: { current: string }
		fr?: { current: string }
	}
	category: 'event' | 'story' | 'tips' | 'destination'
	excerpt?: {
		vi?: string
		vn?: string
		en?: string
		fr?: string
	}
	coverImg?: GalleryImage
	imgTour?: GalleryImage[]
	img_tour?: GalleryImage[]
	content?: {
		vi?: PortableTextBlock[]
		vn?: PortableTextBlock[]
		en?: PortableTextBlock[]
		fr?: PortableTextBlock[]
	}
	isFeatured?: boolean
	publishedAt?: string
	author?: string
}
