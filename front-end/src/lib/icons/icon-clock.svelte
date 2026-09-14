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
	<circle
		cx="12"
		cy="12"
		r="10" />
	<polyline points="12 6 12 12 16 14" />
</svg>
