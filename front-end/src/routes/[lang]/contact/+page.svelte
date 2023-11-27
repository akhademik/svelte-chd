<script lang="ts">
	import { ContactPage } from '$modules/contact-page'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	import type { PageData } from './$types'

	export let data: PageData
	onMount(() => {
		set_seo('Contact Page', 'contact for more info', 'contact')
		return () => set_seo('default')
	})
</script>

<ContactPage {data} />
