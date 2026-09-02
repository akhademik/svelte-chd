/* eslint-disable @typescript-eslint/no-explicit-any */
type Img_Cover = {
	caption?: string
	asset?: {
		_ref?: string
		_type?: string
	}
	_type?: string
}

type Locale_String = {
	vn?: string
	en?: string
	fr?: string
} & GeneralKeyString

type Locale_Array = {
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

export interface Tour {
	best_sell?: boolean
	img_cover?: Img_Cover
	tour_duration?: Locale_String
	tour_highlights?: Highlights[]
	tour_id?: string
	tour_includes?: Locale_String[]
	tour_intro?: Locale_Array
	tour_itinerary?: Locale_Array
	tour_name?: Locale_String
	tour_price?: Price
	tour_slug?: any
	[key: string]: any
}
