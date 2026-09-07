import type { Tour } from '$lib/types/tour.type'

/**
 * Maps raw Sanity tour document into canonical Tour domain model.
 * Decouples schema quirks/legacy fields from UI components.
 */
export function mapSanityToTour(raw: any): Tour {
	if (!raw) return raw

	return {
		...raw,
		best_sell: Boolean(raw.best_sell ?? raw.bestSellerTour ?? raw.bestSell ?? false),
		tour_id: String(raw.tour_id ?? raw.tourId ?? ''),
		img_cover: raw.img_cover ?? raw.coverImg ?? raw.imgCover,
		img_tour: raw.img_tour ?? raw.imgTour ?? [],
		tour_duration: raw.tour_duration ?? raw.tourDuration,
		tour_highlights: raw.tour_highlights ?? raw.tourHighlights ?? [],
		tour_includes: raw.tour_includes ?? raw.tourIncludes ?? [],
		tour_tags: raw.tour_tags ?? raw.tourTags ?? [],
		tour_intro: raw.tour_intro ?? raw.tourIntro,
		tour_itinerary: raw.tour_itinerary ?? raw.tourItinerary,
		tour_name: raw.tour_name ?? raw.tourName,
		tour_price: raw.tour_price ?? raw.tourPrice,
		tour_slug: raw.tour_slug ?? raw.tourSlug,
	}
}

export function mapSanityToTours(rawList: any[]): Tour[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToTour).filter(Boolean)
}
