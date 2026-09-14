<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4' }: Props = $props()
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
	<line
		x1="5"
		y1="12"
		x2="19"
		y2="12" />
	<polyline points="12 5 19 12 12 19" />
</svg>
