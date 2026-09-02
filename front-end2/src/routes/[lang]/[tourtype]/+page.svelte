<script lang="ts">
	import { page } from '$app/stores'
	import LL from '$i18n/i18n-svelte'
	import { BaseLoading } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data } from '$lib/utils/sanity'
	import { TourGallery } from '$modules/tour-page'
	import { set_seo } from '$stores/seo-store'

	let tours = $state<Tour[] | null>(null)
	let tourtype = $derived($page.params.tourtype)

	$effect(() => {
		const current_type = tourtype
		if (current_type) {
			tours = null
			get_sanity_data($page).then(data => {
				tours = data
			})
			if (current_type === 'day-tours') {
				set_seo($LL.seo.day_tours())
			} else {
				set_seo($LL.seo.highland_tours())
			}
		}

		return () => {
			set_seo('default')
		}
	})
</script>

{#if !tours}
	<BaseLoading />
{:else}
	<TourGallery {tours} />
{/if}
