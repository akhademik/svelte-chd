<script lang="ts">
	import type { ListComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		portableText: ListComponentProps
		children?: Snippet
	}

	let { portableText, children }: Props = $props()
	let listItem = $derived(portableText?.value?.listItem)
</script>

{#if listItem === 'number'}
	<ol class="my-4 list-decimal space-y-1.5 pl-6 text-foreground">
		{#if children}{@render children()}{/if}
	</ol>
{:else}
	<ul class="my-4 list-disc space-y-1.5 pl-6 text-foreground">
		{#if children}{@render children()}{/if}
	</ul>
{/if}
