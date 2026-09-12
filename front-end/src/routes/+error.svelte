<script lang="ts">
	import { page } from '$app/state'
	import LL, { locale } from '$i18n/i18n-svelte'

	let status = $derived(page.status)
	let is503 = $derived(status === 503)
	let is404 = $derived(status === 404)
</script>

<div class="flex min-h-[70vh] items-center justify-center px-6 py-24">
	<div class="mx-auto max-w-lg text-center">
		<span class="font-serif text-6xl font-bold text-secondary sm:text-8xl">
			{status}
		</span>

		<h1 class="mt-6 font-serif text-2xl font-bold text-foreground sm:text-3xl">
			{#if is503}
				{$LL.error_page.title_503()}
			{:else if is404}
				{$LL.error_page.title_404()}
			{:else}
				{$LL.error_page.title_default()}
			{/if}
		</h1>

		<p class="mt-4 text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
			{#if is503}
				{$LL.error_page.desc_503()}
			{:else if is404}
				{$LL.error_page.desc_404()}
			{:else}
				{page.error?.message || 'Unexpected error'}
			{/if}
		</p>

		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href={`/${$locale || 'vi'}`}
				class="bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-primary-hover">
				{$LL.nav_bar.home()}
			</a>
			<a
				href={`/${$locale || 'vi'}/contact`}
				class="border border-border bg-surface px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm transition-colors hover:border-foreground">
				{$LL.nav_bar.contact()}
			</a>
		</div>
	</div>
</div>
