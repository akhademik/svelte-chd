<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import { IconChevronDown } from '$lib/icons'

	type FaqCategory = 'all' | 'booking' | 'tours' | 'ethics' | 'prep' | 'cancellation'

	let activeCategory = $state<FaqCategory>('all')
	let openItem = $state<string | null>('q1')

	const faqList = $derived([
		{
			id: 'q1',
			category: 'booking',
			question: $LL.faq_page.items.q1(),
			answer: $LL.faq_page.items.a1(),
		},
		{
			id: 'q2',
			category: 'booking',
			question: $LL.faq_page.items.q2(),
			answer: $LL.faq_page.items.a2(),
		},
		{
			id: 'q3',
			category: 'ethics',
			question: $LL.faq_page.items.q3(),
			answer: $LL.faq_page.items.a3(),
		},
		{
			id: 'q4',
			category: 'prep',
			question: $LL.faq_page.items.q4(),
			answer: $LL.faq_page.items.a4(),
		},
		{
			id: 'q5',
			category: 'tours',
			question: $LL.faq_page.items.q5(),
			answer: $LL.faq_page.items.a5(),
		},
		{
			id: 'q6',
			category: 'tours',
			question: $LL.faq_page.items.q6(),
			answer: $LL.faq_page.items.a6(),
		},
		{
			id: 'q7',
			category: 'prep',
			question: $LL.faq_page.items.q7(),
			answer: $LL.faq_page.items.a7(),
		},
		{
			id: 'q8',
			category: 'cancellation',
			question: $LL.faq_page.items.q8(),
			answer: $LL.faq_page.items.a8(),
		},
	])

	const filteredFaqs = $derived(
		activeCategory === 'all' ? faqList : faqList.filter(item => item.category === activeCategory)
	)

	function toggleItem(id: string) {
		openItem = openItem === id ? null : id
	}
</script>

<div class="space-y-12 pb-20 sm:space-y-16">
	<!-- Hero Section -->
	<section class="border-b border-border/80 bg-surface py-16 sm:py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="max-w-3xl">
				<span class="mb-3 block text-xs font-medium uppercase tracking-[0.25em] text-secondary">
					{$LL.faq_page.hero.subtitle()}
				</span>
				<h1
					class="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
					{$LL.faq_page.hero.title()}
				</h1>
				<p class="mt-6 text-base font-light leading-relaxed text-foreground-muted sm:text-lg">
					{$LL.faq_page.hero.desc()}
				</p>
			</div>
		</div>
	</section>

	<!-- Main FAQ Content -->
	<section class="mx-auto max-w-6xl px-6">
		<!-- Category Filter Pills (hidden on mobile to prevent layout breaking, visible on sm and up) -->
		<div class="mb-10 hidden flex-wrap items-center gap-2.5 sm:flex sm:gap-3">
			<button
				type="button"
				onclick={() => (activeCategory = 'all')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'all'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.all()}
			</button>
			<button
				type="button"
				onclick={() => (activeCategory = 'booking')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'booking'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.booking()}
			</button>
			<button
				type="button"
				onclick={() => (activeCategory = 'tours')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'tours'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.tours()}
			</button>
			<button
				type="button"
				onclick={() => (activeCategory = 'ethics')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'ethics'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.ethics()}
			</button>
			<button
				type="button"
				onclick={() => (activeCategory = 'prep')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'prep'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.prep()}
			</button>
			<button
				type="button"
				onclick={() => (activeCategory = 'cancellation')}
				class="rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:py-2.5 {activeCategory ===
				'cancellation'
					? 'bg-inverse text-inverse-foreground shadow-sm'
					: 'border border-border bg-surface text-foreground-muted hover:border-foreground hover:text-foreground'}">
				{$LL.faq_page.categories.cancellation()}
			</button>
		</div>

		<!-- Accordion List with comfortable left and right padding on items -->
		<div class="divide-y divide-border/80 border-y border-border/80">
			{#each filteredFaqs as faq (faq.id)}
				<div
					class="rounded-sm px-5 transition-colors hover:bg-surface sm:px-6"
					class:bg-surface={openItem === faq.id}>
					<button
						type="button"
						aria-expanded={openItem === faq.id}
						onclick={() => toggleItem(faq.id)}
						class="flex w-full items-center justify-between gap-4 py-5 text-left transition-all sm:py-6">
						<span class="font-serif text-base font-medium text-foreground sm:text-lg lg:text-xl">
							{faq.question}
						</span>
						<span
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-transform duration-200"
							class:rotate-180={openItem === faq.id}>
							<IconChevronDown class="h-4 w-4" />
						</span>
					</button>

					{#if openItem === faq.id}
						<div
							class="pb-6 pt-1 text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
							<p class="max-w-4xl">{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- CTA Banner -->
	<section class="mx-auto max-w-6xl px-6">
		<div
			class="flex flex-col items-center justify-between gap-6 border border-border bg-surface p-8 text-center sm:flex-row sm:p-10 sm:text-left">
			<div>
				<h3 class="font-serif text-xl font-medium text-foreground sm:text-2xl">
					{$LL.faq_page.cta.title()}
				</h3>
				<p class="mt-2 text-xs font-light text-foreground-muted sm:text-sm">
					{$LL.faq_page.cta.desc()}
				</p>
			</div>
			<a
				href={`/${$locale}/contact`}
				class="inline-flex shrink-0 items-center gap-2 bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary-hover">
				{$LL.faq_page.cta.btn()}
			</a>
		</div>
	</section>
</div>
