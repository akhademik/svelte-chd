import type { Tour } from '$lib/types/tour.type'

/**
 * Maps raw Sanity tour document into canonical Tour domain model.
 * Decouples schema quirks/legacy fields from UI components.
 */
export function mapSanityToTour(raw: any): Tour {
	if (!raw) return raw

	return {
		...raw,
		best_sell: Boolean(raw.best_sell ?? false),
		tour_id: String(raw.tour_id ?? ''),
		img_cover: raw.img_cover,
		img_tour: raw.img_tour ?? [],
		tour_duration: raw.tour_duration,
		tour_highlights: raw.tour_highlights ?? [],
		tour_includes: raw.tour_includes ?? [],
		tour_tags: raw.tour_tags ?? [],
		tour_intro: raw.tour_intro,
		tour_itinerary: raw.tour_itinerary,
		tour_name: raw.tour_name,
		tour_price: raw.tour_price,
		tour_slug: raw.tour_slug,
	}
}

export function mapSanityToTours(rawList: any[]): Tour[] {
	if (!Array.isArray(rawList)) return []
	return rawList.map(mapSanityToTour).filter(Boolean)
}
