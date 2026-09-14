<script lang="ts">
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
		duration: string
		levelText: string
		onclose: () => void
	}

	let { tour, duration, levelText, onclose }: Props = $props()
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5 text-foreground-subtle"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<circle
						cx="12"
						cy="10"
						r="3"></circle>
					<polyline points="12 6 12 12 16 14"></polyline>
				</svg>
				<span>{duration}</span>
			</span>
		{/if}
		<span
			class="inline-flex items-center gap-1 rounded border border-border bg-surface px-2 py-0.5 text-[10px] font-medium tracking-wide text-foreground-muted">
			{#if (tour?.tour_level || 'easy') === 'hard'}
				<span class="text-xs">⚡</span>
			{:else if (tour?.tour_level || 'easy') === 'medium'}
				<span class="text-xs">⚖️</span>
			{:else}
				<span class="text-xs">🌿</span>
			{/if}
			<span>{levelText}</span>
		</span>
	</div>
	<button
		type="button"
		onclick={onclose}
		class="flex h-8 w-8 items-center justify-center rounded-full text-foreground-subtle transition-colors hover:bg-surface-muted hover:text-foreground"
		aria-label="Close">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round">
			<line
				x1="18"
				y1="6"
				x2="6"
				y2="18"></line>
			<line
				x1="6"
				y1="6"
				x2="18"
				y2="18"></line>
		</svg>
	</button>
</div>
