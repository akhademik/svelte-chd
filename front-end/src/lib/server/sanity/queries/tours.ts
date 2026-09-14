export const EXTRACT_TOUR_FIELDS = `
	"bestSellerTour": coalesce(bestSellerTour, false),
	"contactForPrice": coalesce(contactForPrice, false),
	"tourHighlights": coalesce(
		tourHighlights[]->{'highlights': tourHighlights},
		[]
	),
	"tourItinerary": tourItinerary,
	"tourIncludes": coalesce(tourIncludes->tourIncludes, []),
	"tourPrice": tourPrice,
	"tourId": coalesce(tourID, ''),
	"goodToKnow": goodToKnow{
		"activityLevel": activityLevel->{ title, description },
		"whatToPack": whatToPack->{ title, description },
		"groupSize": groupSize->{ title, description },
		"otherNotes": otherNotes->{ title, description }
	},
	"imgTour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"coverImg": coverImg{
		...,
		"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
		"alt": coalesce(alt, asset->altText, asset->description, '')
	},
	"tourDuration": tourDuration,
	"tourSlug": tourSlug,
	"tourIntro": tourIntro,
	"tourName": tourName
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
