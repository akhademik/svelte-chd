<script lang="ts">
	import { IconArrowUp } from '$lib/icons'
	import { fly } from 'svelte/transition'

	let y = $state(0)
	let innerHeight = $state(0)

	let visible = $derived(y > (innerHeight > 0 ? innerHeight * 0.75 : 400))

	const scrollToTop = () => {
		if (typeof window === 'undefined') return
		const startPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
		if (startPosition === 0) return

		// Smooth easeInOutCubic scrolling curve
		const duration = Math.min(Math.max(startPosition * 0.35, 500), 900)
		const startTime = performance.now()

		const easeInOutCubic = (t: number): number =>
			t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

		// Temporarily disable CSS scroll-behavior smooth during custom rAF animation to avoid browser fighting
		const html = document.documentElement
		const prevScrollBehavior = html.style.scrollBehavior
		html.style.scrollBehavior = 'auto'

		const step = (currentTime: number) => {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)
			const ease = easeInOutCubic(progress)
			window.scrollTo(0, startPosition * (1 - ease))

			if (progress < 1) {
				requestAnimationFrame(step)
			} else {
				html.style.scrollBehavior = prevScrollBehavior
			}
		}

		requestAnimationFrame(step)
	}
</script>

<svelte:window
	bind:scrollY={y}
	bind:innerHeight />

{#if visible}
	<button
		type="button"
		onclick={scrollToTop}
		transition:fly={{ y: 16, duration: 250 }}
		class="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center border border-border-strong bg-surface/90 text-foreground-muted shadow-md backdrop-blur-sm transition-all hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
		aria-label="Scroll to top of page">
		<IconArrowUp class="h-4 w-4" />
	</button>
{/if}
