<script lang="ts">
	export let title: string
	export let description: string
	export let keywords: string = 'HTML, CSS, JavaScript, SvelteKit'
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content={description} />

	<meta
		name="keywords"
		content={keywords} />

	<meta
		property="og:title"
		content={title} />
	<meta
		property="og:description"
		content={description} />
</svelte:head>
