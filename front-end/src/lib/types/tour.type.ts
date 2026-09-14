import type { GalleryImage } from '$lib/utils/gallery'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Locale_String = {
	vi?: string
	vn?: string
	en?: string
	fr?: string
} & GeneralKeyString

type Locale_Array = {
	vi?: any[]
	vn?: any[]
	en?: any[]
	fr?: any[]
} & GeneralKeyString

type GeneralKeyString = {
	[key: string]: any
}
export type Price = {
	_type?: string
} & { [key: string]: number }

type Highlights = {
	highlights?: Locale_String
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
	[key: string]: any
}

export interface Tour {
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
	tour_slug?: any
	good_to_know?: TourGoodToKnow
	goodToKnow?: TourGoodToKnow
	[key: string]: any
}
