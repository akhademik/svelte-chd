<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { TourGallery } from '$modules/tour-page'
	import { setSeo } from '$stores/seo-store'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	$effect(() => {
		if (data.canonicalCategory === 'day-tours') {
			setSeo($LL.seo.day_tours())
		} else {
			setSeo($LL.seo.highland_tours())
		}
	})
</script>

<TourGallery tours={data.tours} />
