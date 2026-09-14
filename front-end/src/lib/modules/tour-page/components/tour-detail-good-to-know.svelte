<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconActivity, IconGroup, IconPack, IconNotes } from '$lib/icons'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour?: Tour
	}

	let { tour }: Props = $props()

	let items = $derived.by(() => {
		const gtk = tour?.good_to_know || tour?.goodToKnow
		if (!gtk) return []

		const categoryConfigs = [
			{
				type: 'activity',
				title: $LL.tours.good_to_know.activity_level(),
				item: gtk.activityLevel,
			},
			{
				type: 'group',
				title: $LL.tours.good_to_know.group_size(),
				item: gtk.groupSize,
			},
			{
				type: 'packing',
				title: $LL.tours.good_to_know.what_to_pack(),
				item: gtk.whatToPack,
			},
			{
				type: 'notes',
				title: $LL.tours.good_to_know.other_notes(),
				item: gtk.otherNotes,
			},
		]

		return categoryConfigs
			.map(({ type, title, item }) => {
				const description =
					item?.description?.[$locale] || item?.description?.en || item?.description?.vi || ''
				return { type, title, description }
			})
			.filter(item => Boolean(item.description))
	})
</script>

{#if items.length > 0}
	<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
		<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
			{$LL.tours.good_to_know.title()}
		</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each items as item}
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2.5 font-medium text-foreground">
						{#if item.type === 'activity'}
							<IconActivity class="h-4 w-4 shrink-0 text-primary" />
						{:else if item.type === 'group'}
							<IconGroup class="h-4 w-4 shrink-0 text-primary" />
						{:else if item.type === 'packing'}
							<IconPack class="h-4 w-4 shrink-0 text-primary" />
						{:else}
							<IconNotes class="h-4 w-4 shrink-0 text-primary" />
						{/if}
						<h4 class="text-sm font-semibold tracking-tight text-foreground">{item.title}</h4>
					</div>
					<p class="text-xs font-light leading-relaxed text-foreground-muted">
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
{/if}
