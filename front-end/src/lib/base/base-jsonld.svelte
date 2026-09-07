<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import type { Tour } from '$lib/types/tour.type'
	import { url_for } from '$lib/utils/sanity'

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

	let tourName = $derived(
		tour?.tour_name?.[$locale] || tour?.tour_name?.en || tour?.tour_name?.vn || 'CHD Travel Tour'
	)
	let tourImage = $derived(tour?.img_cover ? url_for(tour.img_cover).url() : undefined)
	let tourPrice = $derived(
		tour?.tour_price?.price ||
			tour?.tour_price?.pax2 ||
			tour?.tour_price?.pax1 ||
			tour?.tour_price?.vn ||
			tour?.tour_price?.en ||
			undefined
	)
	let tourDuration = $derived(
		tour?.tour_duration?.[$locale] ||
			tour?.tour_duration?.en ||
			tour?.tour_duration?.vn ||
			undefined
	)

	let postTitle = $derived(
		post?.title?.[$locale as 'vi'] ||
			post?.title?.vi ||
			post?.title?.vn ||
			post?.title?.en ||
			'CHD Journal'
	)
	let postImage = $derived(post?.coverImg ? url_for(post.coverImg).url() : undefined)
	let postExcerpt = $derived(
		post?.excerpt?.[$locale as 'vi'] ||
			post?.excerpt?.vi ||
			post?.excerpt?.vn ||
			post?.excerpt?.en ||
			''
	)

	let scripts = $derived.by(() => {
		const out: string[] = []

		// 1. Organization & LocalBusiness Schema (Site-wide or Root)
		if (isRoot) {
			const orgSchema = {
				'@context': 'https://schema.org',
				'@type': ['TravelAgency', 'LocalBusiness', 'Organization'],
				name: 'CHD Travel',
				alternateName: 'Central Highlands Discovery Travel',
				url: 'https://chd.travel',
				logo: 'https://chd.travel/favicon.ico',
				description:
					'Local boutique travel agency in Central Highlands (Tay Nguyen), Buon Ma Thuot, Vietnam. Go local, See local, Eat local.',
				telephone: '+84982470707',
				email: 'info@chdtravel.com',
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Buon Ma Thuot',
					addressRegion: 'Dak Lak',
					addressCountry: 'VN',
				},
				priceRange: '$$',
				sameAs: [
					'https://www.facebook.com/chdtravel',
					'https://www.instagram.com/chdtravel',
					'https://www.tripadvisor.com',
				],
			}
			out.push('<script type="application/ld+json">' + JSON.stringify(orgSchema) + '<' + '/script>')
		}

		// 2. Tour Schema (TouristTrip & Product)
		if (tour) {
			const tourSchema = {
				'@context': 'https://schema.org',
				'@type': ['TouristTrip', 'Product'],
				name: tourName,
				description: tourName,
				...(tourDuration ? { duration: tourDuration } : {}),
				...(url ? { url } : {}),
				...(tourImage ? { image: tourImage } : {}),
				offers: {
					'@type': 'Offer',
					priceCurrency: 'VND',
					...(tourPrice ? { price: tourPrice } : {}),
					availability: 'https://schema.org/InStock',
					validFrom: new Date().toISOString().split('T')[0],
				},
				provider: {
					'@type': 'TravelAgency',
					name: 'CHD Travel',
					url: 'https://chd.travel',
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
				description: postExcerpt,
				...(url ? { url } : {}),
				...(postImage ? { image: postImage } : {}),
				datePublished: post.publishedAt || undefined,
				author: {
					'@type': 'Person',
					name: post.author || 'CHD Travel Team',
				},
				publisher: {
					'@type': 'Organization',
					name: 'CHD Travel',
					url: 'https://chd.travel',
					logo: {
						'@type': 'ImageObject',
						url: 'https://chd.travel/favicon.ico',
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
