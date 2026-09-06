<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	let { children }: Props = $props()
</script>

<li class="my-1 leading-relaxed text-foreground">
	{#if children}
		{@render children()}
	{/if}
</li>
