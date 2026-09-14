<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { bookingModal } from '$lib/stores/booking-store'
	import type { Tour } from '$lib/types/tour.type'
	import { formatPrice } from '$lib/utils/format-data'

	interface Props {
		tour: Tour
		title: string
		duration: string
		minPrice: number
		isContactForPrice: boolean
	}

	let { tour, title, duration, minPrice, isContactForPrice }: Props = $props()
</script>

<section class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm sm:p-8 lg:p-6">
	<div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
		<!-- Left: Title, Badges & Tags (Full width on desktop when isContactForPrice) -->
		<div class={`space-y-4 ${isContactForPrice ? 'w-full' : 'flex-1'}`}>
			<div class="flex flex-wrap items-center gap-2">
				{#if tour.best_sell}
					<span
						class="bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
						★ Best Sell
					</span>
				{/if}
				{#if tour.tour_id}
					<span
						class="bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
						{tour.tour_id}
					</span>
				{/if}
				{#if duration}
					<span
						class="border border-border bg-surface px-2.5 py-1 text-[10px] font-medium tracking-wide text-foreground-muted">
						⏱ {duration}
					</span>
				{/if}
			</div>

			<h1 class="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
				{title}
			</h1>

			<!-- Tags -->
			{#if tour.tour_tags?.length}
				<div class="flex flex-wrap gap-2 pt-2">
					{#each tour.tour_tags as tag}
						{@const tagName =
							tag?.tour_tags?.[$locale] ||
							tag?.tour_tags?.en ||
							tag?.tourTags?.[$locale] ||
							tag?.tourTags?.en}
						{#if tagName}
							<span
								class="rounded border border-border bg-surface-muted/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground-muted">
								#{tagName}
							</span>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Right: Started Price & Action Buttons (Hidden on desktop when contactForPrice, shown on mobile only) -->
		{#if isContactForPrice}
			<div
				class="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center shadow-sm lg:hidden">
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
		{:else}
			<div
				class="w-full shrink-0 rounded-lg border border-border bg-surface-muted/40 p-5 shadow-sm lg:w-[calc((100%/3)-48px)]">
				<div class="border-b border-border/60 pb-3">
					<div class="flex items-center justify-between gap-2">
						<span class="text-xs font-medium uppercase tracking-wider text-foreground-muted">
							{$LL.tours.price_from()}
						</span>
						<div class="flex items-baseline gap-1">
							<b class="font-serif text-2xl font-bold text-foreground sm:text-3xl">
								{formatPrice(minPrice, $locale)}
							</b>
							<span class="text-xs font-light text-foreground-subtle"
								>/{$LL.tours.detail.pax()}</span>
						</div>
					</div>
					<div class="mt-1 text-right text-[11px] font-light text-foreground-subtle">
						{$LL.tours.detail.price_for_2_pax()}
					</div>
				</div>

				<div class="mt-5 flex flex-col gap-3">
					<button
						onclick={() => bookingModal.open(title)}
						class="flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-colors hover:bg-primary-hover">
						<span>{$LL.tours.book_now()}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
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
					</button>
				</div>
			</div>
		{/if}
	</div>
</section>
