<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import { BaseLoading } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data } from '$lib/utils/sanity'
	import { TourGallery } from '$modules/tour-page'
	import { set_seo } from '$stores/seo-store'
	import { onMount } from 'svelte'

	let tours: Tour[]

	onMount(() => {
		const unsubscribe = page.subscribe(async () => {
			tours = await get_sanity_data($page)
			const path = $page.url.pathname.split('/')[2]
			if (path === 'day-tours') {
				set_seo($LL.seo.day_tours())
			} else {
				set_seo($LL.seo.highland_tours())
			}
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
