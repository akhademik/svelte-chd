<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte'
	import type { Snippet } from 'svelte'

	const colorMap: Record<string, string> = {
		'color-navy': '#1E3A8A',
		'color-amber': '#D97706',
		'color-red': '#DC2626',
		'color-green': '#15803D',
		'color-blue': '#0284C7',
		'color-purple': '#7C3AED',
		'color-gray': '#64748B',
	}

	interface Props {
		portableText: MarkComponentProps<any>
		children?: Snippet
	}

	let { portableText, children }: Props = $props()
	let color = $derived.by(() => {
		const markType = portableText?.markType
		if (markType && colorMap[markType]) {
			return colorMap[markType]
		}
		const raw = portableText?.value?.color
		if (!raw) return 'inherit'
		if (typeof raw === 'object' && raw.hex) return raw.hex
		if (typeof raw === 'string') return raw
		return 'inherit'
	})
</script>

<span style="color: {color}">
	{#if children}{@render children()}{/if}
</span>
