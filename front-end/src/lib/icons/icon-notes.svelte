<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4 text-primary' }: Props = $props()
</script>

<!-- Mature Other Notes / Info Notice Icon -->
<svg
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true">
	<circle
		cx="12"
		cy="12"
		r="10" />
	<line
		x1="12"
		y1="16"
		x2="12"
		y2="12" />
	<line
		x1="12"
		y1="8"
		x2="12.01"
		y2="8" />
</svg>
