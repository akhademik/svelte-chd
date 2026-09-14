import type { Tour, Highlights } from '$lib/types/tour.type'

export type SanityTourRaw = {
	_id?: string
	_type?: string
	tourID?: string
	tourId?: string
	tour_id?: string
	bestSellerTour?: boolean
	best_sell?: boolean
	contactForPrice?: boolean
	contact_for_price?: boolean
	coverImg?: Tour['coverImg']
	img_cover?: Tour['coverImg']
	imgTour?: Tour['imgTour']
	img_tour?: Tour['imgTour']
	tourDuration?: Tour['tourDuration'] | string
	tour_duration?: Tour['tourDuration'] | string
	tourHighlights?: Highlights[] | Array<Record<string, unknown>>
	tour_highlights?: Highlights[] | Array<Record<string, unknown>>
	tourIncludes?: Tour['tourIncludes']
	tour_includes?: Tour['tourIncludes']
	tourIntro?: Tour['tourIntro']
	tour_intro?: Tour['tourIntro']
	tourItinerary?: Tour['tourItinerary']
	tour_itinerary?: Tour['tourItinerary']
	tourName?: Tour['tourName']
	tour_name?: Tour['tourName']
	tourPrice?: Tour['tourPrice']
	tour_price?: Tour['tourPrice']
	tourSlug?: Tour['tourSlug']
	tour_slug?: Tour['tourSlug']
	goodToKnow?: Tour['goodToKnow']
	good_to_know?: Tour['goodToKnow']
	[key: string]: unknown
}

/**
 * Maps raw Sanity tour document into canonical Tour domain model.
 * Decouples schema quirks/legacy fields from UI components.
 */
export function mapSanityToTour(raw: null | undefined): null
export function mapSanityToTour(raw: SanityTourRaw): Tour
export function mapSanityToTour(raw: SanityTourRaw | null | undefined): Tour | null
export function mapSanityToTour(raw: SanityTourRaw | null | undefined): Tour | null {
	if (!raw) return null

	const tourId = String(raw.tourId ?? raw.tourID ?? raw.tour_id ?? '')
	const bestSellerTour = Boolean(raw.bestSellerTour ?? raw.best_sell ?? false)
	const contactForPrice = Boolean(raw.contactForPrice ?? raw.contact_for_price ?? false)
	const coverImg = raw.coverImg ?? raw.img_cover
	const imgTour = (raw.imgTour ?? raw.img_tour ?? []) as Tour['imgTour']
	const tourDuration = (raw.tourDuration ?? raw.tour_duration) as Tour['tourDuration']
	const tourHighlights = (raw.tourHighlights ?? raw.tour_highlights ?? []) as Highlights[]
	const tourIncludes = (raw.tourIncludes ?? raw.tour_includes ?? []) as Tour['tourIncludes']
	const tourIntro = (raw.tourIntro ?? raw.tour_intro) as Tour['tourIntro']
	const tourItinerary = (raw.tourItinerary ?? raw.tour_itinerary) as Tour['tourItinerary']
	const tourName = (raw.tourName ?? raw.tour_name) as Tour['tourName']
	const tourPrice = (raw.tourPrice ?? raw.tour_price) as Tour['tourPrice']
	const tourSlug = raw.tourSlug ?? raw.tour_slug
	const goodToKnow = (raw.goodToKnow ?? raw.good_to_know) as Tour['goodToKnow']

	return {
		...raw,
		tourId,
		bestSellerTour,
		contactForPrice,
		coverImg,
		imgTour,
		tourDuration,
		tourHighlights,
		tourIncludes,
		tourIntro,
		tourItinerary,
		tourName,
		tourPrice,
		tourSlug,
		goodToKnow,
	}
}

export function mapSanityToTours(
	rawList: Array<SanityTourRaw | null | undefined> | null | undefined
): Tour[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToTour).filter((t): t is Tour => t !== null)
}
