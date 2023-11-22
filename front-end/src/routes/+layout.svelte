<script lang="ts">
	import CSeo from '$common/c-seo.svelte'
	import { seo } from '$lib/utils/seo-info'

	import '$lib/styles/main.css'
	import '$lib/styles/tailwind.css'
</script>

<CSeo
	title="CHD Travel - 2023"
	description={seo.description}
	keywords={seo.keywords} />

<slot />
