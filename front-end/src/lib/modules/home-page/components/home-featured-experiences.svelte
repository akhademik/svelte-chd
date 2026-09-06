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

<section class="border-b border-stone-200 bg-sand px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 text-center md:text-left">
			<span class="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
				{$LL.home_page.featured_experiences.subtitle()}
			</span>
			<div class="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<h2 class="max-w-xl font-serif text-3xl font-bold leading-tight text-moss sm:text-4xl">
					{$LL.home_page.featured_experiences.title()}
				</h2>
				<p class="max-w-md text-sm font-light leading-relaxed text-stone-600">
					{$LL.home_page.featured_experiences.desc()}
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each experiences as exp (exp.id)}
				<div
					class="group flex flex-col justify-between border border-stone-200/90 bg-sand-card p-8 transition-all duration-300 hover:border-stone-400 hover:shadow-lg">
					<div>
						<div class="mb-6 flex items-center justify-between">
							<span class="text-2xl">{exp.icon}</span>
							<span
								class="border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-600">
								{exp.tag}
							</span>
						</div>

						<h3
							class="mb-3 font-serif text-xl font-bold text-stone-900 transition-colors group-hover:text-terracotta">
							{exp.title}
						</h3>

						<p class="text-xs font-light leading-relaxed text-stone-600 sm:text-sm">
							{exp.desc}
						</p>
					</div>

					<div class="mt-8 border-t border-stone-200/60 pt-4">
						<a
							href="#day-tours"
							class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-700 transition-colors hover:text-stone-950">
							<span>{$LL.home_page.cta_explore()}</span>
							<span class="transition-transform group-hover:translate-x-1">→</span>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
