<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { FaqPage } from '$modules/faq-page'
	import { set_seo } from '$stores/seo-store'

	$effect(() => {
		const _ = page.url.pathname
		set_seo($LL.seo.faq())
	})
</script>

<FaqPage />
