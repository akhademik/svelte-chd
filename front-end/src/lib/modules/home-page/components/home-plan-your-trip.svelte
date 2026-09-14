<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconArrowRight } from '$lib/icons'
</script>

<section
	id="plan-your-trip"
	class="border-b border-border bg-background px-6 py-12 sm:py-16">
	<div class="mx-auto max-w-3xl text-center">
		<span class="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
			{$LL.home_page.plan_your_trip.subtitle()}
		</span>

		<h2 class="mt-2 font-serif text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
			{$LL.home_page.plan_your_trip.title()}
		</h2>

		<p
			class="mx-auto mt-3 max-w-lg text-xs font-light leading-relaxed text-foreground-muted sm:text-sm">
			{$LL.home_page.plan_your_trip.desc()}
		</p>

		<div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
			<a
				href={`/${$locale}/contact`}
				class="inline-flex w-full items-center justify-center gap-2 bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:bg-primary-hover sm:w-auto">
				<span>
					{$LL.home_page.plan_your_trip.cta_btn()}
				</span>
				<IconArrowRight class="h-3.5 w-3.5" />
			</a>

			<a
				href="#featured-tours"
				class="inline-flex w-full items-center justify-center border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-all duration-300 hover:bg-foreground hover:text-white sm:w-auto">
				{$LL.home_page.cta_explore()}
			</a>
		</div>
	</div>
</section>
