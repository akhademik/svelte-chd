<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		portableText: MarkComponentProps<any>
		children?: Snippet
	}

	let { children }: Props = $props()
</script>

<mark class="rounded-xs bg-yellow-200 px-0.5 text-foreground dark:bg-yellow-500/30">
	{#if children}{@render children()}{/if}
</mark>
