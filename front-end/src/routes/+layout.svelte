<script lang="ts">
	import { BaseSeo } from '$base'
	import { seo } from '$lib/utils/seo-info'

	import '$lib/styles/main.css'
	import '$lib/styles/tailwind.css'
</script>

<BaseSeo
	title="CHD Travel - 2023"
	description={seo.description}
	keywords={seo.keywords} />

<slot />
