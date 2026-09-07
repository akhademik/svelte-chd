export const EXTRACT_TOUR_FIELDS = `
	"best_sell": coalesce(best_sell, bestSellerTour, bestSell, false),
	"tour_highlights": coalesce(
		tour_highlights[]->{'highlights': coalesce(tour_highlights, highlights)},
		tourHighlights[]->{'highlights': coalesce(tour_highlights, tourHighlights, highlights)},
		[]
	),
	"tour_itinerary": coalesce(tour_itinerary, tourItinerary),
	"tour_includes": coalesce(tour_includes->tour_includes, tourIncludes->tourIncludes, tour_includes->includes, []),
	"tour_tags": coalesce(
		tour_tags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		tourTags[]->{'tour_tags': coalesce(tour_tags, tourTags)},
		[]
	),
	"tour_price": coalesce(tour_price, tourPrice),
	"tour_id": coalesce(tour_id, tourId, ''),
	"img_tour": coalesce(
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"img_cover": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgCover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"tour_duration": coalesce(tour_duration, tourDuration),
	"tour_slug": coalesce(tour_slug, tourSlug),
	"tour_intro": coalesce(tour_intro, tourIntro),
	"tour_name": coalesce(tour_name, tourName)
`

export const TOURS_BY_DAY_QUERY = `*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour']]{${EXTRACT_TOUR_FIELDS}}`

export const TOURS_BY_HIGHLAND_QUERY = `*[_type in ['highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`

export const ALL_TOURS_QUERY = `*[_type in ['day-tours', 'tourDaily', 'day_tours', 'daily_tour', 'highland-tours', 'tourCentral', 'highland_tours']]{${EXTRACT_TOUR_FIELDS}}`

export const getSingleTourQuery = (typeFilter: string) => `*[(${typeFilter}) && (
	tour_slug.current == $slug ||
	tourSlug.current == $slug ||
	tour_slug.en.current == $slug ||
	tour_slug.vn.current == $slug ||
	tour_slug.fr.current == $slug ||
	tourSlug.en.current == $slug ||
	tourSlug.vn.current == $slug ||
	tourSlug.fr.current == $slug
)][0]{${EXTRACT_TOUR_FIELDS}}`
