<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import { BaseLoading } from '$lib/base'
	import { get_sanity_data } from '$lib/utils/sanity'
	import { TourGallery } from '$modules/tour-page'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	let tours: any
	onMount(() => {
		const unsubscribe = page.subscribe(async () => {
			const path = $page.url.pathname.split('/')[2]
			path === 'day-tours' ? set_seo($LL.seo.day_tours()) : set_seo($LL.seo.highland_tours())
			tours = await get_sanity_data(path)
		})
		return () => {
			set_seo('default')
			unsubscribe()
		}
	})
</script>

{#if !tours}
	<BaseLoading />
{:else}
	<TourGallery {tours} />
{/if}
