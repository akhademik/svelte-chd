<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import { calculateHeroSlotIndex, getNextHeroRotationDelay } from '$lib/constants/hero'
	import type { HeroImage } from '$lib/types/hero-image.type'
	import { urlFor } from '$lib/utils/sanity'

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

	// Initial index aligned with SSR heroImage (for first paint)
	function getInitialIndex() {
		if (stickyImage) return 0
		if (!heroImage) return 0
		const idx = effectiveImages.findIndex(img => img._id === heroImage._id)
		return idx >= 0 ? idx : 0
	}

	let currentIndex = $state(getInitialIndex())
	let timerId: ReturnType<typeof setTimeout> | null = null

	function syncToClock() {
		if (stickyImage || effectiveImages.length <= 1) {
			if (stickyImage) currentIndex = 0
			return
		}
		currentIndex = calculateHeroSlotIndex(effectiveImages.length, new Date())
	}

	function scheduleNextRotation() {
		if (timerId) {
			clearTimeout(timerId)
			timerId = null
		}
		if (stickyImage || effectiveImages.length <= 1) {
			return
		}
		const delay = getNextHeroRotationDelay(new Date())
		timerId = setTimeout(() => {
			syncToClock()
			scheduleNextRotation()
		}, delay)
	}

	$effect(() => {
		// Sync immediately after hydration / whenever images change
		syncToClock()
		scheduleNextRotation()

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				syncToClock()
				scheduleNextRotation()
			}
		}

		const handlePageShow = () => {
			syncToClock()
			scheduleNextRotation()
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)
		window.addEventListener('pageshow', handlePageShow)

		return () => {
			if (timerId) {
				clearTimeout(timerId)
				timerId = null
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			window.removeEventListener('pageshow', handlePageShow)
		}
	})

	const FALLBACK_HERO_IMAGE = '/hero-fallback.jpg'

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
			return urlFor(currentHero.image).width(2000).quality(95).auto('format').url()
		}
		return FALLBACK_HERO_IMAGE
	})

	let bgImageAlt = $derived(currentHero?.title || 'Untamed Highlands Landscape')
</script>

<section
	class="relative flex min-h-[85vh] items-center justify-center overflow-hidden border-b border-border bg-black px-6 py-24">
	<!-- 1. Full Vibrant Background Image -->
	<img
		src={bgImageUrl}
		alt={bgImageAlt}
		onerror={handleImageError}
		class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
		loading="eager" />

	<!-- 2. Ultra-Light Ambient Scrim: Subtle bottom fade maintaining 85% photo clarity and brightness -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
		aria-hidden="true">
	</div>

	<!-- 3. Streamlined Content: 3 Clean Lines (Eyebrow -> Headline -> CTA) -->
	<div
		class="relative z-10 mx-auto max-w-4xl text-center [text-shadow:_0_2px_8px_rgba(0,0,0,0.8),_0_4px_20px_rgba(0,0,0,0.5)]">
		<!-- Line 1: Refined Eyebrow Tagline -->
		<div class="mb-6 flex justify-center">
			<p
				class="text-xs font-bold uppercase tracking-[0.35em] text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-sm">
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
