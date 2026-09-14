<script lang="ts">
	import { getAvatarInitials } from '$lib/utils/format-data'

	interface Props {
		name: string
		src?: string
		class?: string
		loading?: 'lazy' | 'eager'
	}

	let { name, src, class: className = 'h-7 w-7', loading = 'lazy' }: Props = $props()

	let imageError = $state(false)

	$effect(() => {
		if (src) {
			imageError = false
		}
	})

	let initials = $derived(getAvatarInitials(name))
</script>

<div
	class="relative shrink-0 overflow-hidden rounded-full border border-border bg-surface-muted {className}">
	{#if src && !imageError}
		<img
			{src}
			alt={name}
			{loading}
			referrerpolicy="no-referrer"
			class="h-full w-full object-cover"
			onerror={() => (imageError = true)} />
	{:else}
		<div
			class="flex h-full w-full items-center justify-center font-serif text-xs font-bold text-foreground-muted"
			aria-label={name}>
			{initials}
		</div>
	{/if}
</div>
