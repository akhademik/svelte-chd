<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4 text-primary' }: Props = $props()
</script>

<!-- Mature What to Pack / Backpack Icon -->
<svg
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">
	<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
	<path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
	<path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
	<line
		x1="8"
		y1="10"
		x2="16"
		y2="10" />
</svg>
