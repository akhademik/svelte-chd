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

	let pageTitle = $derived($seo_title ? `${$seo_title} | CHD Travel` : DEFAULT_TITLE)
	let pageDescription = $derived(
		$seo_description ? `${$seo_description} | ${DEFAULT_DESC}` : DEFAULT_DESC
	)
	let pageKeywords = $derived(
		$seo_keywords ? `${$seo_keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS
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
		content="website" />
	<meta
		property="og:title"
		content={pageTitle} />
	<meta
		property="og:description"
		content={pageDescription} />
	{#if $seo_og_image}
		<meta
			property="og:image"
			content={$seo_og_image} />
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
	{#if $seo_og_image}
		<meta
			name="twitter:image"
			content={$seo_og_image} />
	{/if}
</svelte:head>
