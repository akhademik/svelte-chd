import type { Tour, Highlights } from '$lib/types/tour.type'

export type SanityTourRaw = {
	_id?: string
	tour_id?: string
	best_sell?: boolean
	contact_for_price?: boolean
	img_cover?: Tour['img_cover']
	img_tour?: Tour['img_tour']
	tour_duration?: Tour['tour_duration'] | string
	tour_highlights?: Highlights[] | Array<Record<string, unknown>>
	tour_includes?: Tour['tour_includes']
	tour_intro?: Tour['tour_intro']
	tour_itinerary?: Tour['tour_itinerary']
	tour_name?: Tour['tour_name']
	tour_price?: Tour['tour_price']
	tour_slug?: Tour['tour_slug']
	good_to_know?: Tour['good_to_know']
	goodToKnow?: Tour['good_to_know']
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

	return {
		...raw,
		best_sell: Boolean(raw.best_sell ?? false),
		contact_for_price: Boolean(raw.contact_for_price ?? false),
		tour_id: String(raw.tour_id ?? ''),
		img_cover: raw.img_cover,
		img_tour: raw.img_tour ?? [],
		tour_duration: raw.tour_duration as Tour['tour_duration'],
		tour_highlights: (raw.tour_highlights as Highlights[]) ?? [],
		tour_includes: raw.tour_includes ?? [],
		tour_intro: raw.tour_intro,
		tour_itinerary: raw.tour_itinerary,
		tour_name: raw.tour_name,
		tour_price: raw.tour_price,
		tour_slug: raw.tour_slug,
		good_to_know: (raw.good_to_know || raw.goodToKnow || undefined) as Tour['good_to_know'],
	}
}

export function mapSanityToTours(
	rawList: Array<SanityTourRaw | null | undefined> | null | undefined
): Tour[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToTour).filter((t): t is Tour => t !== null)
}
