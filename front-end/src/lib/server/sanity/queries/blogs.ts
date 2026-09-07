export const EXTRACT_BLOG_FIELDS = `
	_id,
	"title": coalesce(title, {}),
	"slug": coalesce(slug, {}),
	"category": coalesce(category, 'story'),
	"excerpt": coalesce(excerpt, {}),
	"coverImg": coalesce(
		coverImg{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		imgCover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_cover{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		}
	),
	"imgTour": coalesce(
		imgTour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		img_tour[]{
			...,
			"caption": coalesce(caption, asset->title, asset->originalFilename, ''),
			"alt": coalesce(alt, asset->altText, asset->description, '')
		},
		[]
	),
	"content": coalesce(content, {}),
	"isFeatured": coalesce(isFeatured, false),
	"publishedAt": coalesce(publishedAt, _createdAt),
	"author": coalesce(author, 'CHD Travel Team')
`

export const FEATURED_BLOGS_QUERY = `*[_type == 'blogPost' && isFeatured == true] | order(publishedAt desc, _createdAt desc)[0...6]{${EXTRACT_BLOG_FIELDS}}`

export const FALLBACK_BLOGS_QUERY = `*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc)[0...3]{${EXTRACT_BLOG_FIELDS}}`

export const ALL_BLOGS_QUERY = `*[_type == 'blogPost'] | order(publishedAt desc, _createdAt desc){${EXTRACT_BLOG_FIELDS}}`

export const EXCHANGE_RATES_QUERY = `*[_type == 'exchangeRates'] | order(exchangeDate desc, _updatedAt desc)[0]{exchangeDate, rates}`
