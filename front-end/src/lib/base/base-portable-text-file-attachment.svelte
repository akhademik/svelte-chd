<script lang="ts">
	import { IconDownload, IconFileText } from '$lib/icons'
	interface Props {
		portableText: {
			value: {
				file?: {
					asset?: {
						_ref?: string
						url?: string
					}
				}
				title?: string
				description?: string
			}
		}
	}

	let { portableText }: Props = $props()
	let value = $derived(portableText?.value)

	// In Sanity, file asset URL resolution
	const getFileUrl = (asset: any) => {
		if (!asset) return '#'
		if (asset.url) return asset.url
		if (asset._ref) {
			// e.g. file-abc123xyz-pdf -> https://cdn.sanity.io/files/<project>/<dataset>/abc123xyz.pdf
			const parts = asset._ref.split('-')
			if (parts.length >= 3) {
				const id = parts[1]
				const ext = parts[2]
				return `https://cdn.sanity.io/files/uzyjbxdd/production/${id}.${ext}`
			}
		}
		return '#'
	}

	let fileUrl = $derived(getFileUrl(value?.file?.asset))
</script>

{#if value?.title}
	<div
		class="my-6 flex items-center justify-between rounded-sm border border-border bg-surface-muted/30 p-4 transition-colors hover:bg-surface-muted/60">
		<div class="flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
				<IconFileText class="h-5 w-5" />
			</div>
			<div>
				<h5 class="text-sm font-medium text-foreground">{value.title}</h5>
				{#if value.description}
					<p class="text-xs text-foreground-muted">{value.description}</p>
				{/if}
			</div>
		</div>

		<a
			href={fileUrl}
			download
			target="_blank"
			rel="noopener noreferrer"
			class="text-primary-foreground inline-flex items-center gap-1.5 rounded bg-primary px-3.5 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-primary-hover">
			<IconDownload class="h-3.5 w-3.5" />
			Download
		</a>
	</div>
{/if}
