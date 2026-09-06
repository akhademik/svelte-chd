<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { TourGallery } from '$modules/tour-page'
	import { set_seo } from '$stores/seo-store'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	$effect(() => {
		if (data.tourtype === 'day-tours') {
			set_seo($LL.seo.day_tours())
		} else {
			set_seo($LL.seo.highland_tours())
		}
	})
</script>

<TourGallery tours={data.tours} />
