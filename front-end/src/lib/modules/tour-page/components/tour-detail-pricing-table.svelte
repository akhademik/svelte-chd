<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { Tour } from '$lib/types/tour.type'
	import { formatPaxNo, formatPrice, getPaxTier } from '$lib/utils/format-data'

	interface Props {
		tour: Tour
		title: string
		duration: string
		minPrice: number
		prices: [string, number][]
		isContactForPrice: boolean
	}

	let { tour, title, duration, minPrice, prices = [], isContactForPrice }: Props = $props()

	// Stepper state
	let guestCount = $state(2)
	let activeTier = $derived(getPaxTier(guestCount))
	let unitPrice = $derived(
		(tour.tour_price?.[activeTier] as number | undefined) ||
			(tour.tour_price?.pax2 as number | undefined) ||
			(tour.tour_price?.pax1 as number | undefined) ||
			minPrice
	)
	let totalPrice = $derived(unitPrice * guestCount)
</script>

{#if isContactForPrice}
	<!-- Contact for Price Notice -->
	<div class="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center shadow-sm">
		<p class="font-serif text-lg font-bold text-primary">
			{$LL.tours.detail.contact_for_price()}
		</p>
		<p class="mt-2 text-xs font-light leading-relaxed text-foreground-muted">
			{$LL.tours.detail.contact_for_price_desc()}
		</p>
		<a
			href={`/${$locale}/contact?tour=${encodeURIComponent(title)}&duration=${encodeURIComponent(duration || '')}&code=${encodeURIComponent(tour.tour_id || '')}`}
			class="mt-4 inline-flex items-center justify-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-primary-hover">
			<span>{$LL.tours.plan_trip()}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<line
					x1="5"
					y1="12"
					x2="19"
					y2="12"></line>
				<polyline points="12 5 19 12 12 19"></polyline>
			</svg>
		</a>
	</div>
{:else if prices.length > 0}
	<div class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm">
		<h3 class="mb-4 font-serif text-lg font-bold text-foreground">
			{$LL.tours.detail.price()}
		</h3>

		<!-- Price Stepper Widget -->
		<div class="mb-5 rounded-lg border border-border bg-surface-muted/40 p-4">
			<div class="flex items-center justify-between">
				<span class="text-xs font-medium uppercase tracking-wider text-foreground-muted">
					{$LL.tours.detail.stepper_guest_count()}
				</span>
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => {
							if (guestCount > 1) guestCount--
						}}
						disabled={guestCount <= 1}
						aria-label="Decrease guest count"
						class="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40">
						-
					</button>
					<span class="w-8 text-center font-serif text-sm font-bold text-foreground">
						{guestCount}
					</span>
					<button
						type="button"
						onclick={() => {
							if (guestCount < 99) guestCount++
						}}
						aria-label="Increase guest count"
						class="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted">
						+
					</button>
				</div>
			</div>

			<!-- Calculation Result -->
			<div class="mt-3.5 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 text-xs">
				<div>
					<span class="block text-[10px] uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.detail.stepper_unit_price()}
					</span>
					<span class="mt-0.5 block font-medium text-foreground">
						{formatPrice(unitPrice, $locale)}
						<span class="text-[10px] font-normal text-foreground-subtle"
							>/{$LL.tours.detail.pax()}</span>
					</span>
				</div>
				<div class="text-right">
					<span class="block text-[10px] uppercase tracking-wider text-foreground-subtle">
						{$LL.tours.detail.stepper_total_price()}
					</span>
					<span class="mt-0.5 block font-serif text-sm font-bold text-primary">
						{formatPrice(totalPrice, $locale)}
					</span>
				</div>
			</div>
		</div>

		<!-- Pricing Table with active row highlight & non-active blur/dim -->
		<div class="space-y-1 divide-y divide-border/60 text-xs sm:text-sm">
			{#each prices as [pax, price], idx}
				{@const paxText = `${formatPaxNo(pax)} ${$LL.tours.detail.pax()}`}
				{@const isActiveTier = activeTier === pax}
				<div
					class={`flex items-center justify-between rounded-md px-2.5 py-2 transition-all duration-200 ${
						isActiveTier
							? 'scale-[1.02] bg-primary/10 font-bold text-primary shadow-sm ring-1 ring-primary/40'
							: 'text-foreground-muted opacity-50 blur-[0.3px] hover:opacity-85 hover:blur-none'
					} ${idx > 0 && !isActiveTier ? 'pt-2' : ''}`}>
					<span class="flex items-center gap-1.5">
						{#if isActiveTier}
							<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
						{/if}
						<span class={isActiveTier ? 'font-bold text-primary' : 'font-normal'}>{paxText}</span>
					</span>
					<span class={isActiveTier ? 'font-bold text-primary' : 'font-medium text-foreground'}>
						{formatPrice(price, $locale)}
						<span class="text-[11px] font-normal text-foreground-subtle"
							>/{$LL.tours.detail.pax()}</span>
					</span>
				</div>
			{/each}
		</div>

		<!-- Disclaimer for estimated foreign exchange currency conversion (Only for foreign currencies EN/FR) -->
		{#if $LL.tours.detail.price_conversion_disclaimer()}
			<div
				class="mt-4 border-t border-border/60 pt-3 text-[11px] font-light leading-relaxed text-foreground-subtle">
				{$LL.tours.detail.price_conversion_disclaimer()}
			</div>
		{/if}
	</div>
{/if}
