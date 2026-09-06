<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface LinkMarkValue {
		_type: 'link'
		href?: string
		blank?: boolean
	}

	interface Props {
		portableText: MarkComponentProps<LinkMarkValue>
		children?: Snippet
	}

	let { portableText, children }: Props = $props()
	let href = $derived(portableText?.value?.href || '#')
	let isBlank = $derived(portableText?.value?.blank !== false)
</script>

<a
	{href}
	target={isBlank ? '_blank' : undefined}
	rel={isBlank ? 'noopener noreferrer' : undefined}
	class="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-hover">
	{#if children}
		{@render children()}
	{/if}
</a>
