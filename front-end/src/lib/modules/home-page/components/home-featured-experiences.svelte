<script lang="ts">
	import LL from '$i18n/i18n-svelte'

	const experiences = $derived([
		{
			id: '01',
			title: $LL.home_page.featured_experiences.items.exp1_title(),
			desc: $LL.home_page.featured_experiences.items.exp1_desc(),
			tag: 'Coffee & Dawn',
			icon: '☕',
		},
		{
			id: '02',
			title: $LL.home_page.featured_experiences.items.exp2_title(),
			desc: $LL.home_page.featured_experiences.items.exp2_desc(),
			tag: 'Indigenous Life',
			icon: '🌿',
		},
		{
			id: '03',
			title: $LL.home_page.featured_experiences.items.exp3_title(),
			desc: $LL.home_page.featured_experiences.items.exp3_desc(),
			tag: 'Gong & Fire',
			icon: '🔥',
		},
	])
</script>

<section class="border-b border-border bg-background px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 text-center md:text-left">
			<span class="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
				{$LL.home_page.featured_experiences.subtitle()}
			</span>
			<div class="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<h2 class="max-w-xl font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
					{$LL.home_page.featured_experiences.title()}
				</h2>
				<p class="max-w-md text-sm font-light leading-relaxed text-foreground-muted">
					{$LL.home_page.featured_experiences.desc()}
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each experiences as exp (exp.id)}
				<div
					class="group flex flex-col justify-between border border-border/90 bg-surface p-8 transition-all duration-300 hover:border-border-strong hover:shadow-lg">
					<div>
						<div class="mb-6 flex items-center justify-between">
							<span class="text-2xl">{exp.icon}</span>
							<span
								class="border border-border bg-surface px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
								{exp.tag}
							</span>
						</div>

						<h3
							class="mb-3 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-secondary">
							{exp.title}
						</h3>

						<p class="text-xs font-light leading-relaxed text-foreground-muted sm:text-sm">
							{exp.desc}
						</p>
					</div>

					<div class="mt-8 border-t border-border/60 pt-4">
						<a
							href="#day-tours"
							class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground">
							<span>{$LL.home_page.cta_explore()}</span>
							<span class="transition-transform group-hover:translate-x-1">→</span>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
