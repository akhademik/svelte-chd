<script lang="ts">
	import LL from '$i18n/i18n-svelte'
</script>

<section class="mx-auto max-w-6xl px-6">
	<div class="mb-10">
		<h2 class="font-serif text-2xl font-normal text-foreground sm:text-3xl">
			{$LL.about_page.difference.title()}
		</h2>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
		<!-- Pillar 1 -->
		<div class="border border-border bg-surface p-6 sm:p-8">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
				<span class="text-lg">🗣️</span>
			</div>
			<h3 class="mt-5 font-serif text-lg font-medium text-foreground">
				{$LL.about_page.difference.pillar_1_title()}
			</h3>
			<p class="mt-3 text-xs font-light leading-relaxed text-foreground-muted sm:text-sm">
				{$LL.about_page.difference.pillar_1_desc()}
			</p>
		</div>

		<!-- Pillar 2 -->
		<div class="border border-border bg-surface p-6 sm:p-8">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
				<span class="text-lg">✨</span>
			</div>
			<h3 class="mt-5 font-serif text-lg font-medium text-foreground">
				{$LL.about_page.difference.pillar_2_title()}
			</h3>
			<p class="mt-3 text-xs font-light leading-relaxed text-foreground-muted sm:text-sm">
				{$LL.about_page.difference.pillar_2_desc()}
			</p>
		</div>

		<!-- Pillar 3 -->
		<div class="border border-border bg-surface p-6 sm:p-8">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary">
				<span class="text-lg">🐘</span>
			</div>
			<h3 class="mt-5 font-serif text-lg font-medium text-foreground">
				{$LL.about_page.difference.pillar_3_title()}
			</h3>
			<p class="mt-3 text-xs font-light leading-relaxed text-foreground-muted sm:text-sm">
				{$LL.about_page.difference.pillar_3_desc()}
			</p>
		</div>
	</div>
</section>
