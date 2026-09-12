export const EXTRACT_HERO_IMAGE_FIELDS = `
	_id,
	"title": coalesce(title, 'Hero Image'),
	"image": image{
		asset->{
			_id,
			_ref,
			url
		},
		hotspot,
		crop
	},
	"isSticky": coalesce(isSticky, false),
	"isActive": coalesce(isActive, true)
`

export const HERO_IMAGES_QUERY = `*[_type == 'heroImage' && coalesce(isActive, true) == true] | order(_createdAt desc){${EXTRACT_HERO_IMAGE_FIELDS}}`
