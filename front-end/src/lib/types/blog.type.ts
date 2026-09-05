export interface BlogPost {
	_id: string
	title: {
		vn?: string
		en?: string
		fr?: string
	}
	slug: {
		current?: string
		vn?: { current: string }
		en?: { current: string }
		fr?: { current: string }
	}
	category: 'event' | 'story' | 'tips' | 'destination'
	excerpt?: {
		vn?: string
		en?: string
		fr?: string
	}
	coverImg?: any
	content?: {
		vn?: any[]
		en?: any[]
		fr?: any[]
	}
	isFeatured?: boolean
	publishedAt?: string
	author?: string
}
