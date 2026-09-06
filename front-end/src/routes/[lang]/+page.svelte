<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { HomePage } from '$modules/home-page'
	import { set_seo } from '$stores/seo-store'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	$effect(() => {
		const _ = page.url.pathname
		set_seo($LL.seo.home())
	})
</script>

<HomePage {data} />
