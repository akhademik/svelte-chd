<script lang="ts">
	import type { Tour } from '$lib/types/tour.type'

	import DetailsLeftPanel from './components/details-left-panel.svelte'
	import DetailsNavigation from './components/details-navigation.svelte'
	import DetailsRightPanel from './components/details-right-panel.svelte'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

<div
	class="relative flex min-h-screen w-full flex-col bg-stone-50 lg:h-screen lg:flex-row lg:overflow-hidden">
	<DetailsNavigation />
	<DetailsLeftPanel {tour} />
	<DetailsRightPanel {tour} />
</div>
