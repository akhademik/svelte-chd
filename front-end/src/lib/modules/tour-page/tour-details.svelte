<script lang="ts">
	import { tour_index_store } from '$lib/stores/tour-store'
	import type { Tour } from '$lib/types/tour.type'

	import DetailsNavigation from './components/details-navigation.svelte'

	export let tour: Tour
</script>

<h1 class="text-3xl font-bold text-red-700">Tour Details: {tour.tour_slug.current}</h1>
<h1 class="text-3xl font-bold text-red-700">Index: {$tour_index_store}</h1>
<DetailsNavigation />
