import type { GalleryImage } from '$lib/utils/gallery'

export type LocaleString = {
	vi?: string
	vn?: string
	en?: string
	fr?: string
	[key: string]: string | undefined
}

export type LocaleArray = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	vi?: any[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	vn?: any[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	en?: any[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fr?: any[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export type Price = {
	_type?: string
	pax1?: number
	pax2?: number
	pax3_4?: number
	pax5_6?: number
	pax7_9?: number
	pax10_up?: number
	price?: number
	[key: string]: unknown
}

export type Highlights = {
	highlights?: LocaleString | Record<string, unknown>
	[key: string]: unknown
}

export interface GoodToKnowItem {
	title?: LocaleString
	description?: LocaleString
}

export interface TourGoodToKnow {
	activityLevel?: GoodToKnowItem
	whatToPack?: GoodToKnowItem
	groupSize?: GoodToKnowItem
	otherNotes?: GoodToKnowItem
	[key: string]: unknown
}

export interface Tour {
	_id?: string
	_type?: string
	tourId?: string
	tourName?: LocaleString
	tourDuration?: LocaleString
	coverImg?: GalleryImage
	imgTour?: GalleryImage[]
	tourIntro?: LocaleArray
	tourItinerary?: LocaleArray
	tourPrice?: Price
	tourHighlights?: Highlights[]
	tourIncludes?: LocaleString[]
	contactForPrice?: boolean
	bestSellerTour?: boolean
	tourSlug?: Record<string, { current?: string } | string> | string | null
	goodToKnow?: TourGoodToKnow
	[key: string]: unknown
}
