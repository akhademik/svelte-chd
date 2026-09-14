<script lang="ts">
	interface Props {
		class?: string
	}

	let { class: className = 'h-4 w-4 fill-current' }: Props = $props()
</script>

<svg
	class={className}
	viewBox="0 0 24 24"
	aria-hidden="true">
	<path
		d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.12c1.47 0 2.8.52 3.84 1.39l-1.04 1.3a4.67 4.67 0 0 0-5.6 0l-1.04-1.3A6.16 6.16 0 0 1 12 5.12zM5.5 14.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm13 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-11.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm10 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
</svg>
