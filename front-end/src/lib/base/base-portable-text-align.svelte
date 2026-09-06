<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		portableText: MarkComponentProps<any>
		children?: Snippet
	}

	let { portableText, children }: Props = $props()
	let markType = $derived(portableText?.markType)
	let alignClass = $derived.by(() => {
		if (markType === 'align-center') return 'text-center block w-full'
		if (markType === 'align-right') return 'text-right block w-full'
		if (markType === 'align-justify') return 'text-justify block w-full'
		return 'text-left block w-full'
	})
</script>

<span class={alignClass}>
	{#if children}{@render children()}{/if}
</span>
