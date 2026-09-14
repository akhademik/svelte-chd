<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

{#if tour.tour_highlights?.length}
	<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
		<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
			{$LL.tours.detail.highlights()}
		</h2>
		<div class="space-y-4">
			{#each tour.tour_highlights as { highlights }}
				{#if highlights?.[$locale]}
					<div class="flex items-start gap-3 text-sm font-light text-foreground-muted sm:text-base">
						<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary"></span>
						<span>{highlights[$locale]}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
