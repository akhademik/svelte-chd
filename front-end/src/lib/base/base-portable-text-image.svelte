<script lang="ts">
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		portableText: {
			value: {
				asset?: any
				alt?: string
				caption?: string
				displaySize?: 'small' | 'medium' | 'large' | 'full'
				[key: string]: any
			}
		}
	}

	let { portableText }: Props = $props()
	let value = $derived(portableText?.value)

	const sizeClasses: Record<string, { container: string; imgWidth: number }> = {
		small: { container: 'max-w-xs mx-auto', imgWidth: 400 },
		medium: { container: 'max-w-md mx-auto', imgWidth: 600 },
		large: { container: 'max-w-3xl mx-auto', imgWidth: 900 },
		full: { container: 'w-full', imgWidth: 1200 },
	}

	let currentSize = $derived(sizeClasses[value?.displaySize || 'large'] || sizeClasses.large)
</script>

{#if value?.asset}
	<figure class="my-6 space-y-2 overflow-hidden rounded-sm {currentSize.container}">
		<img
			src={url_for(value).width(currentSize.imgWidth).auto('format').quality(85).url()}
			alt={value?.alt || value?.caption || 'CHD Travel Blog Image'}
			class="h-auto w-full object-cover"
			loading="lazy" />
		{#if value?.caption}
			<figcaption class="px-4 py-2 text-center text-xs font-light italic text-foreground-muted">
				{value.caption}
			</figcaption>
		{/if}
	</figure>
{/if}
