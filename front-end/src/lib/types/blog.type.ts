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
	coverImg?: any
	imgTour?: any[]
	img_tour?: any[]
	content?: {
		vi?: any[]
		vn?: any[]
		en?: any[]
		fr?: any[]
	}
	isFeatured?: boolean
	publishedAt?: string
	author?: string
}
