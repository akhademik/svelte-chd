<script lang="ts">
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		portableText: {
			value: any
		}
	}

	let { portableText }: Props = $props()
	let value = $derived(portableText?.value)
</script>

{#if value?.asset}
	<figure class="my-6 space-y-2 overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
		<img
			src={url_for(value).width(900).auto('format').quality(85).url()}
			alt={value?.alt || value?.caption || 'CHD Travel Blog Image'}
			class="h-auto w-full object-cover"
			loading="lazy" />
		{#if value?.caption}
			<figcaption class="px-4 py-2 text-center text-xs font-light italic text-stone-500">
				{value.caption}
			</figcaption>
		{/if}
	</figure>
{/if}
