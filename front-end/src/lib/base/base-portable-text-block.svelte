<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		portableText: BlockComponentProps
		children?: Snippet
	}

	let { portableText, children }: Props = $props()
	let style = $derived(portableText?.value?.style || 'normal')
	let textAlign = $derived((portableText?.value as any)?.textAlign || 'left')

	const alignClasses: Record<string, string> = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
		justify: 'text-justify',
	}
	let alignClass = $derived(alignClasses[textAlign] || 'text-left')
</script>

{#if style === 'h1'}
	<h1
		class="mb-5 mt-10 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl {alignClass}">
		{#if children}{@render children()}{/if}
	</h1>
{:else if style === 'h2'}
	<h2
		class="mb-4 mt-8 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl {alignClass}">
		{#if children}{@render children()}{/if}
	</h2>
{:else if style === 'h3'}
	<h3
		class="mb-3 mt-6 font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl {alignClass}">
		{#if children}{@render children()}{/if}
	</h3>
{:else if style === 'h4'}
	<h4 class="mb-2 mt-5 text-lg font-semibold text-foreground {alignClass}">
		{#if children}{@render children()}{/if}
	</h4>
{:else if style === 'h5'}
	<h5
		class="mb-2 mt-4 text-sm font-semibold uppercase tracking-wider text-foreground-muted {alignClass}">
		{#if children}{@render children()}{/if}
	</h5>
{:else if style === 'h6'}
	<h6
		class="mb-2 mt-3 text-xs font-semibold uppercase tracking-wider text-foreground-muted {alignClass}">
		{#if children}{@render children()}{/if}
	</h6>
{:else if style === 'lead'}
	<p class="my-4 text-lg font-normal leading-relaxed text-foreground-muted {alignClass}">
		{#if children}{@render children()}{/if}
	</p>
{:else if style === 'blockquote'}
	<blockquote
		class="my-6 border-l-4 border-primary/80 bg-surface-muted/50 py-3 pl-4 pr-3 italic text-foreground {alignClass}">
		{#if children}{@render children()}{/if}
	</blockquote>
{:else}
	<p class="my-3 leading-relaxed text-foreground {alignClass}">
		{#if children}{@render children()}{/if}
	</p>
{/if}
