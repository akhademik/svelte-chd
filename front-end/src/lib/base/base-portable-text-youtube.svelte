<script lang="ts">
	interface Props {
		portableText: {
			value: {
				url?: string
				caption?: string
			}
		}
	}

	let { portableText }: Props = $props()
	let url = $derived(portableText?.value?.url || '')
	let caption = $derived(portableText?.value?.caption)

	const getEmbedUrl = (rawUrl: string) => {
		if (!rawUrl) return null
		try {
			if (rawUrl.includes('youtube.com/watch')) {
				const id = new URL(rawUrl).searchParams.get('v')
				return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
			}
			if (rawUrl.includes('youtu.be/')) {
				const id = rawUrl.split('youtu.be/')[1]?.split('?')[0]
				return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
			}
			if (rawUrl.includes('vimeo.com/')) {
				const id = rawUrl.split('vimeo.com/')[1]?.split('?')[0]
				return id ? `https://player.vimeo.com/video/${id}` : null
			}
			return rawUrl
		} catch {
			return rawUrl
		}
	}

	let embedUrl = $derived(getEmbedUrl(url))
</script>

{#if embedUrl}
	<figure class="my-6 space-y-2">
		<div
			class="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-black">
			<iframe
				src={embedUrl}
				title={caption || 'Video'}
				class="absolute inset-0 h-full w-full"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
		</div>
		{#if caption}
			<figcaption class="text-center text-xs font-light italic text-foreground-muted">
				{caption}
			</figcaption>
		{/if}
	</figure>
{/if}
