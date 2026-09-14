<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { portableTextComponents } from '$lib/utils/portable-text-components'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

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
