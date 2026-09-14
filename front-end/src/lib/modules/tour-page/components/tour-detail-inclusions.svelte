<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

{#if tour.tour_includes?.length}
	<div class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm">
		<h3 class="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 text-emerald-600"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><circle
					cx="12"
					cy="12"
					r="10"></circle
				><polyline points="9 12 12 15 16 10"></polyline></svg>
			<span>{$LL.tours.detail.inclusion()}</span>
		</h3>
		<ul class="space-y-2.5 text-xs font-light text-foreground-muted sm:text-sm">
			{#each tour.tour_includes as item}
				{#if item?.[$locale]}
					<li class="flex items-start gap-2.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
						<span>{item[$locale]}</span>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
