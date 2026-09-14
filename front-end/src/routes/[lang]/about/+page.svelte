<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { AboutPage } from '$modules/about-page'
	import { setSeo } from '$stores/seo-store'

	$effect(() => {
		const _ = page.url.pathname
		setSeo($LL.seo.about())
	})
</script>

<AboutPage />
