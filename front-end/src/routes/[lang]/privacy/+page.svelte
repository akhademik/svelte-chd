<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { PrivacyPage } from '$modules/privacy-page'
	import { setSeo } from '$stores/seo-store'

	$effect(() => {
		const _ = page.url.pathname
		setSeo($LL.seo.privacy())
	})
</script>

<PrivacyPage />
