<script lang="ts">
	import type { Tour } from '$lib/types/tour.type'

	import DetailsLeftPanel from './components/details-left-panel.svelte'
	import DetailsNavigation from './components/details-navigation.svelte'
	import DetailsRightPanel from './components/details-right-panel.svelte'

	export let tour: Tour
</script>

<DetailsNavigation />
<DetailsLeftPanel {tour} />
<DetailsRightPanel {tour} />
