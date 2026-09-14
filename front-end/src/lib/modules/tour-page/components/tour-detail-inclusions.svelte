<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconCheck, IconCheckCircle } from '$lib/icons'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour: Tour
	}

	let { tour }: Props = $props()
</script>

{#if tour.tourIncludes?.length}
	<div class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm">
		<h3 class="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
			<IconCheckCircle class="h-4 w-4 text-emerald-600" />
			<span>{$LL.tours.detail.inclusion()}</span>
		</h3>
		<ul class="space-y-2.5 text-xs font-light text-foreground-muted sm:text-sm">
			{#each tour.tourIncludes as item}
				{#if item?.[$locale]}
					<li class="flex items-start gap-2.5">
						<IconCheck class="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
						<span>{item[$locale]}</span>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
