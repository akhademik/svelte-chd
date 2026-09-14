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
	aria-hidden="true">
	<circle
		cx="12"
		cy="12"
		r="10" />
	<polyline points="9 12 12 15 16 10" />
</svg>
