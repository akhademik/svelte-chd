<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { AboutPage } from '$modules/about-page'
	import { set_seo } from '$stores/seo-store'

	$effect(() => {
		const _ = page.url.pathname
		set_seo($LL.seo.about())

		return () => {
			set_seo('default')
		}
	})
</script>

<AboutPage />
