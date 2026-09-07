export const EXTRACT_TOUR_FIELDS = `
	"best_sell": coalesce(bestSellerTour, false),
	"tour_highlights": coalesce(
		tourHighlights[]->{'highlights': tourHighlights},
		[]
	),
	"tour_itinerary": tourItinerary,
	"tour_includes": coalesce(tourIncludes->tourIncludes, []),
	"tour_tags": coalesce(
		tourTags[]->{'tour_tags': tourTags, 'tourTags': tourTags},
		[]
	),
	"tour_price": tourPrice,
	"tour_id": coalesce(tourID, ''),
	"img_tour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"img_cover": coverImg{
		...,
		"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
		"alt": coalesce(alt, asset->altText, asset->description, '')
	},
	"tour_duration": tourDuration,
	"tour_slug": tourSlug,
	"tour_intro": tourIntro,
	"tour_name": tourName
`

export const TOURS_BY_DAY_QUERY = `*[_type == 'tourDaily']{${EXTRACT_TOUR_FIELDS}}`

export const TOURS_BY_HIGHLAND_QUERY = `*[_type == 'tourCentral']{${EXTRACT_TOUR_FIELDS}}`

export const getSingleTourQuery = (typeFilter: string) => `*[(${typeFilter}) && (
	tourSlug.current == $slug ||
	tourSlug.vi.current == $slug ||
	tourSlug.vn.current == $slug ||
	tourSlug.en.current == $slug ||
	tourSlug.fr.current == $slug
)][0]{${EXTRACT_TOUR_FIELDS}}`
