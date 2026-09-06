<script lang="ts">
	import type { ListItemComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		portableText?: ListItemComponentProps
		children?: Snippet
	}

	let { children }: Props = $props()
</script>

<li class="my-1 leading-relaxed text-foreground">
	{#if children}
		{@render children()}
	{/if}
</li>
