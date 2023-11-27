<script lang="ts">
	import { page } from '$app/stores'
	import { TourGallery } from '$modules/tour-page'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			const path = $page.url.pathname.split('/')[2]
			path === 'day-tours' ? set_seo('Day Tours') : set_seo('Highland Tours')
		})
		return () => {
			set_seo('default')
			unsubscribe()
		}
	})
</script>

<TourGallery />
