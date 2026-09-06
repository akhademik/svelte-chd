<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section
	class="relative flex min-h-[85vh] items-center justify-center border-b border-stone-200 px-6">
	<div class="mx-auto max-w-4xl py-20 text-center">
		<div class="mb-6 flex flex-col items-center gap-2">
			<span class="font-serif text-sm italic tracking-widest text-secondary">
				"{$LL.home_page.slogan()}"
			</span>
			<p class="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
				{$LL.home_page.tagline()}
			</p>
		</div>

		<h1
			class="mb-8 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl md:text-7xl">
			{$LL.home_page.hero_title_line1()} <br />
			<span class="font-normal text-primary">{$LL.home_page.hero_title_line2()}</span>
		</h1>

		<p
			class="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-foreground-muted sm:text-lg">
			{$LL.home_page.intro()}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="#day-tours"
				class="inline-flex w-full items-center justify-center gap-2 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary-hover sm:w-auto">
				<span>
					{$LL.home_page.cta_explore()}
				</span>
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
			</a>
		</div>
	</div>
</section>
