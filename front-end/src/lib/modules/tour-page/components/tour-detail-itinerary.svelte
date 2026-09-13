<script lang="ts">
	import type { Snippet } from 'svelte'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { portableTextComponents } from '$lib/utils/portable-text-components'

	interface Props {
		tour: Tour
		mobilePricing?: Snippet
	}

	let { tour, mobilePricing }: Props = $props()
</script>

<div class="flex flex-col gap-10">
	<!-- Tour Overview / Intro -->
	{#if tour.tour_intro?.[$locale]}
		<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
			<h2 class="mb-4 font-serif text-2xl font-bold text-foreground">
				{$LL.tours.detail.intro()}
			</h2>
			<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
				<PortableText
					value={tour.tour_intro[$locale]}
					components={portableTextComponents} />
			</div>
		</div>
	{/if}

	<!-- Highlights -->
	{#if tour.tour_highlights?.length}
		<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
			<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
				{$LL.tours.detail.highlights()}
			</h2>
			<div class="space-y-4">
				{#each tour.tour_highlights as { highlights }}
					{#if highlights?.[$locale]}
						<div
							class="flex items-start gap-3 text-sm font-light text-foreground-muted sm:text-base">
							<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary"></span>
							<span>{highlights[$locale]}</span>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	<!-- Mobile View Pricing (Positioned right below Highlights) -->
	{#if mobilePricing}
		{@render mobilePricing()}
	{/if}

	<!-- Itinerary -->
	{#if tour.tour_itinerary?.[$locale]}
		<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
			<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
				{$LL.tours.detail.itinerary()}
			</h2>
			<div class="text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
				<PortableText
					value={tour.tour_itinerary[$locale]}
					components={portableTextComponents} />
			</div>
		</div>
	{/if}
</div>
