export interface HeroImage {
	_id: string
	title: string
	image: {
		asset: {
			_ref?: string
			_type?: string
			url?: string
		}
		hotspot?: {
			x: number
			y: number
			height: number
			width: number
		}
	}
	isSticky?: boolean
	isActive?: boolean
}
