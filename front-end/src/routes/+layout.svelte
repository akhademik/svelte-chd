<script lang="ts">
	import { BaseSeo } from '$base'
	import { setLocale } from '$i18n/i18n-svelte'
	import { seo } from '$lib/utils/seo-info'

	import '$lib/styles/main.css'
	import '$lib/styles/tailwind.css'

	export let data
	setLocale(data.locale)
</script>

<BaseSeo
	title="CHD Travel - 2023"
	description={seo.description}
	keywords={seo.keywords} />

<slot />
