<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import { ContactPage } from '$modules/contact-page'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	import type { PageData } from './$types'

	export let data: PageData

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			set_seo(`CHD Travel - ${$LL.seo.contact()}`)
		})
		return () => {
			set_seo('default')
			unsubscribe()
		}
	})
</script>

<ContactPage {data} />
