<script lang="ts">
	import { dev } from '$app/environment'
	import LL from '$i18n/i18n-svelte'
	import type { HeroImage } from '$lib/types/hero-image.type'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		heroImage?: HeroImage | null
		heroImages?: HeroImage[]
	}

	let { heroImage, heroImages = [] }: Props = $props()

	// 1. Sticky priority: If any image is marked Sticky, ALWAYS freeze on it (both Dev & Prod)
	let stickyImage = $derived(
		heroImages.find(img => img.isSticky) || (heroImage?.isSticky ? heroImage : null)
	)

	// 2. Effective images list:
	// - If Sticky: lock to sticky image only
	// - Otherwise: list of all active images (or fallback heroImage)
	let effectiveImages = $derived.by(() => {
		if (stickyImage) {
			return [stickyImage]
		}
		if (heroImages.length > 0) {
			return heroImages
		}
		return heroImage ? [heroImage] : []
	})

	// Initial index aligned with SSR heroImage
	let initialIndex = $derived(
		heroImage ? Math.max(0, effectiveImages.findIndex(img => img._id === heroImage._id)) : 0
	)
	let currentIndex = $state(0)
	let intervalId: ReturnType<typeof setInterval> | null = null

	$effect(() => {
		currentIndex = initialIndex
	})

	$effect(() => {
		if (intervalId) {
			clearInterval(intervalId)
			intervalId = null
		}
		// Rotation: 5 seconds in DEV, 5 minutes (300,000 ms) in PRODUCTION
		const rotationInterval = dev ? 5 * 1000 : 5 * 60 * 1000

		if (!stickyImage && effectiveImages.length > 1) {
			intervalId = setInterval(() => {
				currentIndex = (currentIndex + 1) % effectiveImages.length
			}, rotationInterval)
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId)
				intervalId = null
			}
		}
	})

	const FALLBACK_HERO_IMAGE =
		'https://cdn.sanity.io/images/uzyjbxdd/production/963ada63fd50d74b09e870505890e737e80cd9b4-4000x2252.jpg?w=2000&q=85&auto=format'

	const handleImageError = (e: Event) => {
		const target = e.currentTarget as HTMLImageElement | null
		if (target && target.src !== FALLBACK_HERO_IMAGE) {
			target.src = FALLBACK_HERO_IMAGE
		}
	}

	let currentHero = $derived(
		effectiveImages.length > 0 ? effectiveImages[currentIndex % effectiveImages.length] : null
	)

	let bgImageUrl = $derived.by(() => {
		if (currentHero?.image?.asset) {
			return url_for(currentHero.image).width(2000).quality(85).auto('format').url()
		}
		return FALLBACK_HERO_IMAGE
	})

	let bgImageAlt = $derived(currentHero?.title || 'Untamed Highlands Landscape')
</script>

<section
	class="relative flex min-h-[85vh] items-center justify-center overflow-hidden border-b border-border bg-black px-6 py-24">
	<!-- 1. Full 100% Vibrant Background Image -->
	<img
		src={bgImageUrl}
		alt={bgImageAlt}
		onerror={handleImageError}
		class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
		loading="eager" />

	<!-- 2. Targeted Radial Scrim (Option A: Focused contrast for text center, full vibrancy for edges) -->
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(0,0,0,0.15)_60%,_rgba(0,0,0,0.4)_100%)]"
		aria-hidden="true">
	</div>

	<!-- 3. Streamlined Content: 3 Clean Lines (Eyebrow -> Headline -> CTA) -->
	<div
		class="relative z-10 mx-auto max-w-4xl text-center [text-shadow:_0_2px_8px_rgba(0,0,0,0.8),_0_4px_24px_rgba(0,0,0,0.6)]">
		<!-- Line 1: Glowing Refined Eyebrow Tagline -->
		<div class="mb-6 flex justify-center">
			<p
				class="text-xs font-bold uppercase tracking-[0.35em] text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] drop-shadow-[0_0_14px_rgba(251,191,36,0.65)] sm:text-sm">
				{$LL.home_page.tagline()}
			</p>
		</div>

		<!-- Line 2: Prominent 2-Line Headline -->
		<h1
			class="mb-10 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl">
			{$LL.home_page.hero_title_line1()} <br />
			<span class="font-normal text-amber-200">{$LL.home_page.hero_title_line2()}</span>
		</h1>

		<!-- Line 3: High-Contrast CTA Button -->
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="#featured-tours"
				class="inline-flex w-full items-center justify-center gap-3 bg-primary px-9 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary-hover sm:w-auto">
				<span>{$LL.home_page.cta_explore()}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="5"
						y1="12"
						x2="19"
						y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</a>
		</div>
	</div>
</section>
