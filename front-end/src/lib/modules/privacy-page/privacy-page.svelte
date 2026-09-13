<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<div class="space-y-12 pb-20 sm:space-y-16">
	<!-- Hero Section -->
	<section class="border-b border-border/80 bg-surface py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="max-w-3xl">
				<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-secondary">
					{$LL.privacy_page.hero.subtitle()}
				</span>
				<h1
					class="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
					{$LL.privacy_page.hero.title()}
				</h1>
				<p class="mt-6 text-base font-light leading-relaxed text-foreground-muted sm:text-lg">
					{$LL.privacy_page.hero.desc()}
				</p>
			</div>
		</div>
	</section>

	<!-- Content Section -->
	<section class="mx-auto max-w-6xl px-6">
		<div class="max-w-4xl space-y-10">
			<div class="border-b border-border/60 pb-8">
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_1_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_1_content()}
				</p>
			</div>

			<div class="border-b border-border/60 pb-8">
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_2_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_2_content()}
				</p>
			</div>

			<div class="border-b border-border/60 pb-8">
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_3_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_3_content()}
				</p>
			</div>

			<div class="border-b border-border/60 pb-8">
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_4_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_4_content()}
				</p>
			</div>

			<div class="border-b border-border/60 pb-8">
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_5_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_5_content()}
				</p>
			</div>

			<div>
				<h2 class="font-serif text-xl font-bold text-foreground sm:text-2xl">
					{$LL.privacy_page.sections.sec_6_title()}
				</h2>
				<p
					class="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
					{$LL.privacy_page.sections.sec_6_content()}
				</p>
			</div>
		</div>
	</section>
</div>
