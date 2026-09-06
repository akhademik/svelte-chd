<script lang="ts">
	import { page } from '$app/state'
	import {
		DEFAULT_DESC,
		DEFAULT_KEYWORDS,
		DEFAULT_TITLE,
		seo_description,
		seo_keywords,
		seo_og_image,
		seo_title,
	} from '$stores/seo-store'

	interface Props {
		title?: string
		description?: string
		keywords?: string
		ogImage?: string
		ogType?: string
	}

	let {
		title: propTitle,
		description: propDescription,
		keywords: propKeywords,
		ogImage: propOgImage,
		ogType = 'website',
	}: Props = $props()

	let rawTitle = $derived(propTitle ?? $seo_title)
	let rawDesc = $derived(propDescription ?? $seo_description)
	let rawKeywords = $derived(propKeywords ?? $seo_keywords)
	let rawOgImage = $derived(propOgImage ?? $seo_og_image)

	let pageTitle = $derived(rawTitle ? `${rawTitle} | CHD Travel` : DEFAULT_TITLE)
	let pageDescription = $derived(rawDesc ? `${rawDesc} | ${DEFAULT_DESC}` : DEFAULT_DESC)
	let pageKeywords = $derived(
		rawKeywords ? `${rawKeywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS
	)

	// Compute canonical and hreflang links based on current pathname
	const origin = 'https://chd.travel'
	let currentPath = $derived(page.url.pathname)

	// Generate corresponding path for other languages: /<lang>/...
	const getLangPath = (targetLang: 'vn' | 'en' | 'fr') => {
		const parts = currentPath.split('/').filter(Boolean)
		if (parts.length === 0) {
			return `${origin}/${targetLang}`
		}
		if (['vn', 'en', 'fr'].includes(parts[0])) {
			parts[0] = targetLang
			return `${origin}/${parts.join('/')}`
		}
		return `${origin}/${targetLang}/${parts.join('/')}`
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content={pageDescription} />
	<meta
		name="keywords"
		content={pageKeywords} />

	<!-- Canonical & Multilingual hreflang -->
	<link
		rel="canonical"
		href={`${origin}${currentPath}`} />
	<link
		rel="alternate"
		hreflang="vi"
		href={getLangPath('vn')} />
	<link
		rel="alternate"
		hreflang="en"
		href={getLangPath('en')} />
	<link
		rel="alternate"
		hreflang="fr"
		href={getLangPath('fr')} />
	<link
		rel="alternate"
		hreflang="x-default"
		href={getLangPath('en')} />

	<!-- OpenGraph / Facebook / Zalo -->
	<meta
		property="og:type"
		content={ogType} />
	<meta
		property="og:title"
		content={pageTitle} />
	<meta
		property="og:description"
		content={pageDescription} />
	<meta
		property="og:url"
		content={`${origin}${currentPath}`} />
	{#if rawOgImage}
		<meta
			property="og:image"
			content={rawOgImage} />
	{/if}

	<!-- Twitter Card -->
	<meta
		name="twitter:card"
		content="summary_large_image" />
	<meta
		name="twitter:title"
		content={pageTitle} />
	<meta
		name="twitter:description"
		content={pageDescription} />
	{#if rawOgImage}
		<meta
			name="twitter:image"
			content={rawOgImage} />
	{/if}
</svelte:head>
