<script lang="ts">
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
					<polyline points="14 2 14 8 20 8"></polyline>
				</svg>
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-3.5 w-3.5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line
					x1="12"
					y1="15"
					x2="12"
					y2="3"></line>
			</svg>
			Download
		</a>
	</div>
{/if}
