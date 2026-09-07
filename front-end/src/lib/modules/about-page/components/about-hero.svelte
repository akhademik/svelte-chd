<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="border-b border-border/80 bg-surface py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-secondary">
					{$LL.about_page.hero.subtitle()}
				</span>
				<h1
					class="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
					{$LL.about_page.hero.title()}
				</h1>
				<p class="mt-6 text-base font-light leading-relaxed text-foreground-muted sm:text-lg">
					{$LL.about_page.hero.desc()}
				</p>
			</div>

			<!-- Hero Visual Card / Philosophy -->
			<div class="relative lg:col-span-5">
				<div
					class="overflow-hidden border border-border bg-inverse p-8 text-inverse-foreground shadow-xl sm:p-10">
					<span class="text-xs uppercase tracking-widest text-secondary">
						{$LL.about_page.hero.philosophy_tag()}
					</span>
					<blockquote
						class="mt-4 font-serif text-xl font-normal italic leading-relaxed text-inverse-foreground">
						{$LL.about_page.hero.philosophy_quote()}
					</blockquote>
					<p class="mt-4 text-xs font-light leading-relaxed text-inverse-foreground/80">
						{$LL.about_page.hero.philosophy_desc()}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
