<script lang="ts">
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
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content={pageDescription} />
	<meta
		name="keywords"
		content={pageKeywords} />

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
