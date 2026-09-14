<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'

	interface Props {
		tour?: Tour
	}

	let { tour }: Props = $props()

	let seasonIcon = $derived(tour?.good_to_know?.activitySeason?.icon || '🌤')
	let seasonTitle = $derived(
		tour?.good_to_know?.activitySeason?.title?.[$locale] ||
			tour?.good_to_know?.activitySeason?.title?.en ||
			$LL.tours.good_to_know.season_title()
	)
	let seasonDesc = $derived(
		tour?.good_to_know?.activitySeason?.description?.[$locale] ||
			tour?.good_to_know?.activitySeason?.description?.en ||
			$LL.tours.good_to_know.season_desc()
	)

	let packIcon = $derived(tour?.good_to_know?.whatToPack?.icon || '🎒')
	let packTitle = $derived(
		tour?.good_to_know?.whatToPack?.title?.[$locale] ||
			tour?.good_to_know?.whatToPack?.title?.en ||
			$LL.tours.good_to_know.packing_title()
	)
	let packDesc = $derived(
		tour?.good_to_know?.whatToPack?.description?.[$locale] ||
			tour?.good_to_know?.whatToPack?.description?.en ||
			$LL.tours.good_to_know.packing_desc()
	)

	let transportIcon = $derived(tour?.good_to_know?.transportGroup?.icon || '🚐')
	let transportTitle = $derived(
		tour?.good_to_know?.transportGroup?.title?.[$locale] ||
			tour?.good_to_know?.transportGroup?.title?.en ||
			$LL.tours.good_to_know.pickup_title()
	)
	let transportDesc = $derived(
		tour?.good_to_know?.transportGroup?.description?.[$locale] ||
			tour?.good_to_know?.transportGroup?.description?.en ||
			$LL.tours.good_to_know.pickup_desc()
	)

	let dietIcon = $derived(tour?.good_to_know?.dietNotes?.icon || '🥗')
	let dietTitle = $derived(
		tour?.good_to_know?.dietNotes?.title?.[$locale] ||
			tour?.good_to_know?.dietNotes?.title?.en ||
			$LL.tours.good_to_know.diet_title()
	)
	let dietDesc = $derived(
		tour?.good_to_know?.dietNotes?.description?.[$locale] ||
			tour?.good_to_know?.dietNotes?.description?.en ||
			$LL.tours.good_to_know.diet_desc()
	)
</script>

<div class="rounded-xl border border-border/90 bg-surface p-6 sm:p-8">
	<h2 class="mb-6 font-serif text-2xl font-bold text-foreground">
		{$LL.tours.good_to_know.title()}
	</h2>
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">{seasonIcon}</span>
				<h4>{seasonTitle}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{seasonDesc}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">{packIcon}</span>
				<h4>{packTitle}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{packDesc}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">{transportIcon}</span>
				<h4>{transportTitle}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{transportDesc}
			</p>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-2 font-medium text-foreground">
				<span class="text-base">{dietIcon}</span>
				<h4>{dietTitle}</h4>
			</div>
			<p class="text-xs font-light leading-relaxed text-foreground-muted">
				{dietDesc}
			</p>
		</div>
	</div>
</div>
