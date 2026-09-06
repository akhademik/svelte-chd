<script lang="ts">
	import LL from '$i18n/i18n-svelte'

	const values = $derived([
		{
			id: '01',
			title: $LL.home_page.why_chd.values.v1_title(),
			desc: $LL.home_page.why_chd.values.v1_desc(),
			icon: 'people',
		},
		{
			id: '02',
			title: $LL.home_page.why_chd.values.v2_title(),
			desc: $LL.home_page.why_chd.values.v2_desc(),
			icon: 'nature',
		},
		{
			id: '03',
			title: $LL.home_page.why_chd.values.v3_title(),
			desc: $LL.home_page.why_chd.values.v3_desc(),
			icon: 'coffee',
		},
		{
			id: '04',
			title: $LL.home_page.why_chd.values.v4_title(),
			desc: $LL.home_page.why_chd.values.v4_desc(),
			icon: 'compass',
		},
	])
</script>

<section class="border-b border-stone-200 bg-sand-alt/40 px-6 py-20 sm:py-28">
	<div class="mx-auto max-w-6xl">
		<div class="mb-16 text-center md:text-left">
			<span class="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
				{$LL.home_page.why_chd.subtitle()}
			</span>
			<div class="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<h2 class="max-w-xl font-serif text-3xl font-bold leading-tight text-moss sm:text-4xl">
					{$LL.home_page.why_chd.title()}
				</h2>
				<p class="max-w-md text-sm font-light leading-relaxed text-stone-600">
					{$LL.home_page.why_chd.desc()}
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each values as val (val.id)}
				<div
					class="group relative flex flex-col justify-between border border-stone-200/90 bg-sand-card p-7 transition-all duration-300 hover:border-stone-400 hover:shadow-lg">
					<div>
						<div class="mb-6 flex items-center justify-between">
							<span class="font-serif text-2xl font-normal text-terracotta">
								{val.id}
							</span>
							<div class="h-2 w-2 rounded-full bg-moss/40 transition-colors group-hover:bg-moss">
							</div>
						</div>
						<h3 class="mb-3 font-serif text-lg font-bold text-stone-900">
							{val.title}
						</h3>
						<p class="text-xs font-light leading-relaxed text-stone-600">
							{val.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
