<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { ContactPage } from '$modules/contact-page'
	import { set_seo } from '$stores/seo-store'

	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	$effect(() => {
		// Read page.url to track navigation
		const _ = page.url.pathname
		set_seo($LL.seo.contact())

		return () => {
			set_seo('default')
		}
	})
</script>

<ContactPage {data} />
