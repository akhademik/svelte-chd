<script lang="ts">
	import { IconClock, IconClose } from '$lib/icons'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
		duration: string
		onclose: () => void
	}

	let { tour, duration, onclose }: Props = $props()
</script>

<!-- Modal Header (Sticky top) -->
<div
	class="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
	<div class="flex items-center gap-2 text-foreground-muted">
		{#if tour.tour_id}
			<span
				class="bg-inverse px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-inverse-foreground">
				{tour.tour_id}
			</span>
		{/if}
		{#if duration}
			<span class="flex items-center gap-1.5 text-xs font-light text-foreground-muted">
				<IconClock class="h-3.5 w-3.5 text-foreground-subtle" />
				<span>{duration}</span>
			</span>
		{/if}
	</div>
	<button
		type="button"
		onclick={onclose}
		class="flex h-8 w-8 items-center justify-center rounded-full text-foreground-subtle transition-colors hover:bg-surface-muted hover:text-foreground"
		aria-label="Close">
		<IconClose class="h-5 w-5" />
	</button>
</div>
