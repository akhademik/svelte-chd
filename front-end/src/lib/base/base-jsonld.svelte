<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import { SITE_CONFIG } from '$lib/constants/site'
	import type { BlogPost } from '$lib/types/blog.type'
	import type { Tour } from '$lib/types/tour.type'
	import { extractPlainText, getLocalizedField } from '$lib/utils/format-data'
	import { urlFor } from '$lib/utils/sanity'

	interface BreadcrumbItem {
		name: string
		item: string
	}

	interface Props {
		tour?: Tour | null
		post?: BlogPost | null
		breadcrumbs?: BreadcrumbItem[]
		url?: string
		isRoot?: boolean
	}

	let { tour, post, breadcrumbs, url, isRoot = false }: Props = $props()

	let tourName = $derived(getLocalizedField(tour?.tour_name, $locale, 'CHD Travel Tour'))
	let tourImage = $derived(tour?.img_cover ? urlFor(tour.img_cover).url() : undefined)
	let tourIntro = $derived(
		extractPlainText(tour?.tour_intro?.[$locale] || tour?.tour_intro?.vi || tour?.tour_intro?.en)
	)
	let tourDescription = $derived(tourIntro || tourName)
	let isContactForPrice = $derived(Boolean(tour?.contact_for_price))

	let postTitle = $derived(getLocalizedField(post?.title, $locale, 'CHD Journal'))
	let postImage = $derived(post?.coverImg ? urlFor(post.coverImg).url() : undefined)
	let postExcerpt = $derived(getLocalizedField(post?.excerpt, $locale, ''))

	let scripts = $derived.by(() => {
		const out: string[] = []

		// 1. Organization & LocalBusiness Schema (Site-wide or Root)
		if (isRoot) {
			const orgSchema = {
				'@context': 'https://schema.org',
				'@type': ['TravelAgency', 'LocalBusiness', 'Organization'],
				name: SITE_CONFIG.name,
				alternateName: SITE_CONFIG.alternateName,
				url: SITE_CONFIG.url,
				logo: SITE_CONFIG.logo,
				description: SITE_CONFIG.description,
				telephone: SITE_CONFIG.telephone,
				email: SITE_CONFIG.email,
				address: {
					'@type': 'PostalAddress',
					addressLocality: SITE_CONFIG.address.addressLocality,
					addressRegion: SITE_CONFIG.address.addressRegion,
					addressCountry: SITE_CONFIG.address.addressCountry,
				},
				priceRange: SITE_CONFIG.priceRange,
				sameAs: [...SITE_CONFIG.socialLinks],
			}
			out.push('<script type="application/ld+json">' + JSON.stringify(orgSchema) + '<' + '/script>')
		}

		// 2. Tour Schema (TouristTrip)
		if (tour) {
			const tourSchema = {
				'@context': 'https://schema.org',
				'@type': 'TouristTrip',
				name: tourName,
				description: tourDescription,
				...(url ? { url } : {}),
				...(tourImage ? { image: tourImage } : {}),
				...(!isContactForPrice && tour?.tour_price?.price
					? {
							offers: {
								'@type': 'Offer',
								priceCurrency: 'VND',
								price: tour.tour_price.price,
								validFrom: new Date().toISOString().split('T')[0],
							},
						}
					: {}),
				provider: {
					'@type': 'TravelAgency',
					name: SITE_CONFIG.name,
					url: SITE_CONFIG.url,
				},
			}
			out.push(
				'<script type="application/ld+json">' + JSON.stringify(tourSchema) + '<' + '/script>'
			)
		}

		// 3. Blog Article Schema (Article)
		if (post) {
			const articleSchema = {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: postTitle,
				description: postExcerpt || postTitle,
				...(url ? { url } : {}),
				...(postImage ? { image: postImage } : {}),
				datePublished: post.publishedAt || undefined,
				author: {
					'@type': 'Person',
					name: post.author || 'CHD Travel Team',
				},
				publisher: {
					'@type': 'Organization',
					name: SITE_CONFIG.name,
					url: SITE_CONFIG.url,
					logo: {
						'@type': 'ImageObject',
						url: SITE_CONFIG.logo,
					},
				},
			}
			out.push(
				'<script type="application/ld+json">' + JSON.stringify(articleSchema) + '<' + '/script>'
			)
		}

		// 4. BreadcrumbList Schema
		if (breadcrumbs && breadcrumbs.length > 0) {
			const breadcrumbSchema = {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumbs.map((b, idx) => ({
					'@type': 'ListItem',
					position: idx + 1,
					name: b.name,
					item: b.item,
				})),
			}
			out.push(
				'<script type="application/ld+json">' + JSON.stringify(breadcrumbSchema) + '<' + '/script>'
			)
		}

		return out
	})
</script>

<svelte:head>
	{#each scripts as tag}
		{@html tag}
	{/each}
</svelte:head>
