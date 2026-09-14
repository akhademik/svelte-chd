import type { GalleryImage } from '$lib/utils/gallery'

export type Locale_String = {
	vi?: string
	vn?: string
	en?: string
	fr?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export type Locale_Array = {
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
} & { [key: string]: number }

export type Highlights = {
	highlights?: Locale_String | Record<string, unknown>
	[key: string]: unknown
}

export interface GoodToKnowItem {
	title?: Locale_String
	description?: Locale_String
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
	best_sell?: boolean
	contact_for_price?: boolean
	img_cover?: GalleryImage
	img_tour?: GalleryImage[]
	tour_duration?: Locale_String
	tour_highlights?: Highlights[]
	tour_id?: string
	tour_includes?: Locale_String[]
	tour_intro?: Locale_Array
	tour_itinerary?: Locale_Array
	tour_name?: Locale_String
	tour_price?: Price
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tour_slug?: any
	good_to_know?: TourGoodToKnow
	goodToKnow?: TourGoodToKnow
	[key: string]: unknown
}
