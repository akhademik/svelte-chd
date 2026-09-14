<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-3.5 w-3.5' }: Props = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">
	<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
	<polyline points="7 10 12 15 17 10" />
	<line
		x1="12"
		y1="15"
		x2="12"
		y2="3" />
</svg>
