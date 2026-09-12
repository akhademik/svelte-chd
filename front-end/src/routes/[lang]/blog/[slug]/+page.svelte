<script lang="ts">
	import { browser } from '$app/environment'
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd, BaseSeo } from '$lib/base'
	import type { BlogPost } from '$lib/types/blog.type'
	import { get_localized_field } from '$lib/utils/format-data'
	import { portableTextComponents } from '$lib/utils/portable-text-components'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	let post: BlogPost = $derived(data.post)
	let title = $derived(get_localized_field(post?.title, $locale, 'CHD Journal'))
	let excerpt = $derived(get_localized_field(post?.excerpt, $locale, ''))
	let content = $derived(get_localized_field(post?.content, $locale, []))

	let allImages = $derived.by(() => {
		const list: any[] = []
		const seenRefs = new Set<string>()

		const addImg = (img: any) => {
			if (!img) return
			const ref =
				img?.asset?._ref || img?.asset?._id || img?._id || (typeof img === 'string' ? img : null)
			if (img?.asset || (typeof img === 'object' && (img._ref || img.url))) {
				if (ref && seenRefs.has(ref)) return
				if (ref) seenRefs.add(ref)
				list.push(img)
			}
		}

		// 1. Cover Image
		addImg(post?.coverImg)

		// 2. Album / Extra Images
		const rawAlbum = post?.imgTour || post?.img_tour || []
		if (Array.isArray(rawAlbum) && rawAlbum.length > 0) {
			rawAlbum.forEach(img => addImg(img))
		}

		// 3. Images from PortableText content if album is short
		if (list.length < 5 && Array.isArray(content) && content.length > 0) {
			content.forEach((block: any) => {
				if (block?._type === 'image' && block?.asset) {
					addImg(block)
				}
			})
		}

		return list
	})

	// Lightbox state & touch swipe handlers
	let isLightboxOpen = $state(false)
	let lightboxIndex = $state(0)
	let touchStartX = $state(0)
	let touchEndX = $state(0)

	const openLightbox = (index: number) => {
		if (allImages.length === 0) return
		lightboxIndex = (index + allImages.length) % allImages.length
		isLightboxOpen = true
	}

	const closeLightbox = () => {
		isLightboxOpen = false
	}

	const nextImage = () => {
		if (allImages.length <= 1) return
		lightboxIndex = (lightboxIndex + 1) % allImages.length
	}

	const prevImage = () => {
		if (allImages.length <= 1) return
		lightboxIndex = (lightboxIndex - 1 + allImages.length) % allImages.length
	}

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].screenX
	}

	const handleTouchEnd = (e: TouchEvent) => {
		touchEndX = e.changedTouches[0].screenX
		const swipeDistance = touchEndX - touchStartX
		if (Math.abs(swipeDistance) > 40) {
			if (swipeDistance < 0) {
				nextImage()
			} else {
				prevImage()
			}
		}
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (!isLightboxOpen) return
		if (e.key === 'Escape') closeLightbox()
		if (e.key === 'ArrowRight') nextImage()
		if (e.key === 'ArrowLeft') prevImage()
	}

	$effect(() => {
		if (browser) {
			if (isLightboxOpen) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = ''
			}
			return () => {
				document.body.style.overflow = ''
			}
		}
	})

	let primaryCoverUrl = $derived(
		allImages.length > 0
			? url_for(allImages[0]).width(1200).height(650).auto('format').quality(85).url()
			: undefined
	)

	const getCategoryName = (cat: string) => {
		switch (cat) {
			case 'places':
				return $LL.blog_page.categories.places()
			case 'food':
				return $LL.blog_page.categories.food()
			case 'people':
				return $LL.blog_page.categories.people()
			case 'stories':
				return $LL.blog_page.categories.stories()
			case 'tips':
				return $LL.blog_page.categories.tips()
			case 'event':
				return $LL.blog_page.categories.event()
			case 'destination':
				return $LL.blog_page.categories.destination()
			case 'story':
				return $LL.blog_page.categories.story()
			default:
				return 'Journal'
		}
	}

	let breadcrumbItems = $derived([
		{ name: $LL.nav_bar.home(), item: `https://chd.travel/${$locale}` },
		{ name: 'CHD Journal', item: `https://chd.travel/${$locale}/blog` },
		{ name: title, item: `https://chd.travel/${$locale}/blog/${post?.slug?.current || ''}` },
	])
</script>

<svelte:window onkeydown={handleKeydown} />

<BaseSeo
	{title}
	description={excerpt || undefined}
	ogImage={primaryCoverUrl}
	ogType="article" />

<BaseJsonLd
	{post}
	breadcrumbs={breadcrumbItems}
	url={`https://chd.travel/${$locale}/blog/${post?.slug?.current || ''}`} />

<div class="space-y-10 pb-24">
	<!-- 1. Top Breadcrumb & Header Navigation -->
	<section class="border-b border-border/80 bg-surface/50 py-3 sm:py-4">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
			<!-- Mobile View: Parent Category Back Link -->
			<div class="flex items-center md:hidden">
				<a
					href={`/${$locale}/blog`}
					class="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-foreground-muted transition-colors hover:text-foreground">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3.5 w-3.5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
					CHD Journal
				</a>
			</div>

			<!-- Desktop View: Full Breadcrumbs -->
			<nav
				class="hidden items-center gap-2 text-xs uppercase tracking-wider text-foreground-muted md:flex">
				<a
					href={`/${$locale}`}
					class="transition-colors hover:text-foreground">
					{$LL.nav_bar.home()}
				</a>
				<span>/</span>
				<a
					href={`/${$locale}/blog`}
					class="transition-colors hover:text-foreground">
					CHD Journal
				</a>
				<span>/</span>
				<span class="font-medium text-foreground">{getCategoryName(post.category)}</span>
			</nav>

			<!-- Desktop View: Back to Articles Button -->
			<a
				href={`/${$locale}/blog`}
				class="hidden items-center gap-2 border border-border-strong bg-surface px-4 py-1.5 text-xs uppercase tracking-wider text-foreground shadow-sm transition-all hover:border-foreground hover:text-foreground md:inline-flex">
				{$LL.blog_page.all_articles_btn()}
			</a>
		</div>
	</section>

	<div class="mx-auto max-w-6xl space-y-10 px-6">
		<!-- 2. Media Gallery (Bento Grid just like in Tour Details) -->
		{#if allImages.length > 0}
			<section class="relative">
				<!-- Desktop / Tablet Bento Grid (Left 1 big, Right 4 small) -->
				<div
					class="hidden h-[420px] grid-cols-4 gap-2.5 overflow-hidden rounded-xl bg-transparent md:grid lg:h-[480px]">
					<!-- Left Column: 1 Big Picture (Takes 2 cols, full height) -->
					<div
						role="button"
						tabindex="0"
						onclick={() => openLightbox(0)}
						onkeydown={e => e.key === 'Enter' && openLightbox(0)}
						class="group relative col-span-2 h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
						<img
							src={url_for(allImages[0]).width(1200).height(800).auto('format').quality(85).url()}
							alt={allImages[0]?.caption || title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
						<div
							class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						</div>
					</div>

					<!-- Right Column: 4 Small Pictures (2x2 grid, takes 2 cols) -->
					<div class="col-span-2 grid h-full grid-cols-2 grid-rows-2 gap-2.5">
						{#each [1, 2, 3, 4] as imgIdx}
							{@const imageItem = allImages[imgIdx] || allImages[0]}
							{@const isLastVisible = imgIdx === 4}
							{@const hasMoreImages = allImages.length > 5}
							<div
								role="button"
								tabindex="0"
								onclick={() => openLightbox(imgIdx < allImages.length ? imgIdx : 0)}
								onkeydown={e =>
									e.key === 'Enter' && openLightbox(imgIdx < allImages.length ? imgIdx : 0)}
								class="group relative h-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30">
								<img
									src={url_for(imageItem).width(600).height(400).auto('format').quality(80).url()}
									alt={imageItem?.caption || title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
								<div
									class="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								</div>

								<!-- Overlay badge on 4th image if more images exist -->
								{#if isLastVisible && hasMoreImages}
									<div
										class="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/50 text-white backdrop-blur-[2px] transition-colors group-hover:bg-black/60">
										<span class="font-serif text-xl font-bold">+{allImages.length - 4}</span>
										<span class="text-[11px] uppercase tracking-wider">
											{$LL.blog_page.view_all()}
										</span>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Mobile View (Featured Image with swipeable preview and counter) -->
				<div class="space-y-2 md:hidden">
					<div
						role="button"
						tabindex="0"
						onclick={() => openLightbox(0)}
						onkeydown={e => e.key === 'Enter' && openLightbox(0)}
						class="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl bg-surface-muted/30 shadow-sm">
						<img
							src={url_for(allImages[0]).width(800).height(500).auto('format').quality(85).url()}
							alt={allImages[0]?.caption || title}
							class="h-full w-full object-cover" />
						<div
							class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
							1 / {allImages.length}
						</div>
					</div>

					{#if allImages.length > 1}
						<div class="flex gap-2 overflow-x-auto pb-1">
							{#each allImages.slice(0, 6) as imgItem, idx}
								<button
									type="button"
									onclick={() => openLightbox(idx)}
									class="relative aspect-[16/10] h-16 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-surface-muted/30">
									<img
										src={url_for(imgItem).width(160).height(100).auto('format').quality(70).url()}
										alt={imgItem?.caption || `Thumbnail ${idx + 1}`}
										class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Floating "View All Photos" Button -->
				<button
					type="button"
					onclick={() => openLightbox(0)}
					class="absolute bottom-4 right-4 hidden items-center gap-2 rounded-md border border-border bg-surface/95 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground shadow-lg backdrop-blur-md transition-all hover:border-foreground hover:bg-surface hover:text-primary md:inline-flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							ry="2"></rect>
						<circle
							cx="8.5"
							cy="8.5"
							r="1.5"></circle>
						<polyline points="21 15 16 10 5 21"></polyline>
					</svg>
					<span>
						{$LL.blog_page.view_all_photos({ count: allImages.length })}
					</span>
				</button>
			</section>
		{/if}

		<!-- 3. Article Header & Meta Info -->
		<section class="rounded-xl border border-border/90 bg-surface p-6 shadow-sm sm:p-8 md:p-10">
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<span
						class="bg-inverse px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-inverse-foreground">
						{getCategoryName(post.category)}
					</span>
					<span class="text-xs text-foreground-subtle">
						{post.publishedAt?.split('T')[0] || ''}
					</span>
				</div>

				<h1
					class="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
					{title}
				</h1>

				{#if excerpt}
					<p class="text-base font-light italic leading-relaxed text-foreground-muted sm:text-lg">
						"{excerpt}"
					</p>
				{/if}

				<div
					class="flex items-center gap-2 border-t border-border pt-4 text-xs text-foreground-muted">
					<span>{$LL.blog_page.author_prefix()}</span>
					<span class="font-medium text-foreground">{post.author || 'CHD Travel Team'}</span>
				</div>
			</div>
		</section>

		<!-- 4. Article Body Content -->
		{#if content && (Array.isArray(content) ? content.length > 0 : true)}
			<article class="rounded-xl border border-border/90 bg-surface p-6 sm:p-10">
				<div
					class="prose max-w-none text-sm font-light leading-relaxed text-foreground sm:text-base">
					<PortableText
						value={content}
						components={portableTextComponents} />
				</div>

				<!-- Bottom Back Navigation -->
				<div class="mt-10 flex items-center justify-between border-t border-border pt-8">
					<a
						href={`/${$locale}/blog`}
						class="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-inverse hover:text-white">
						{$LL.blog_page.all_articles_btn()}
					</a>
				</div>
			</article>
		{/if}
	</div>
</div>

<!-- Fullscreen Lightbox Overlay (Infinite loop navigation, 50% Translucent Glassmorphism & Touch Swiping) -->
{#if isLightboxOpen && allImages.length > 0}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[80] flex h-[100dvh] max-h-[100dvh] flex-col justify-between overflow-hidden bg-black/50 text-white backdrop-blur-md"
		role="dialog"
		aria-modal="true"
		aria-label={$LL.tours.gallery.photos_aria()}>
		<!-- Lightbox Header -->
		<div
			class="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			<div class="flex items-center gap-3 overflow-hidden pr-2">
				<span class="truncate font-serif text-sm font-medium text-white/90 sm:text-base">
					{title}
				</span>
				<span
					class="hidden rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-light text-white/80 sm:inline-block">
					{lightboxIndex + 1} / {allImages.length}
				</span>
			</div>
			<button
				type="button"
				onclick={closeLightbox}
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
				aria-label={$LL.blog_page.close()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line
						x1="18"
						y1="6"
						x2="6"
						y2="18"></line>
					<line
						x1="6"
						y1="6"
						x2="18"
						y2="18"></line>
				</svg>
			</button>
		</div>

		<!-- Lightbox Main Stage (Infinite navigation & touch swipe for mobile) -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-6 md:p-8"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}>
			<!-- Previous Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={prevImage}
				class="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:left-6 sm:h-12 sm:w-12"
				aria-label={$LL.tours.gallery.prev_photo()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</button>

			<!-- Active Image (Centered, zero jitter) -->
			<div class="relative flex h-full max-h-[72vh] w-full max-w-5xl items-center justify-center">
				<img
					src={url_for(allImages[lightboxIndex])
						.width(1600)
						.height(1000)
						.auto('format')
						.quality(90)
						.url()}
					alt={allImages[lightboxIndex]?.caption || title}
					class="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl transition-all duration-200" />
			</div>

			<!-- Next Image Button (Desktop / Tablet) -->
			<button
				type="button"
				onclick={nextImage}
				class="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/70 hover:text-white focus:outline-none sm:right-6 sm:h-12 sm:w-12"
				aria-label={$LL.tours.gallery.next_photo()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</button>
		</div>

		<!-- Lightbox Footer / Thumbnails Strip -->
		<div class="border-t border-white/10 px-4 py-3 sm:px-6 sm:py-4">
			{#if allImages.length > 1}
				<div class="flex justify-center gap-2 overflow-x-auto py-1">
					{#each allImages as imgItem, idx}
						<button
							type="button"
							onclick={() => (lightboxIndex = idx)}
							class={`relative aspect-[16/10] h-12 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-14 ${
								lightboxIndex === idx
									? 'scale-105 border-secondary opacity-100'
									: 'border-transparent opacity-40 hover:opacity-80'
							}`}>
							<img
								src={url_for(imgItem).width(120).height(80).auto('format').quality(70).url()}
								alt=""
								class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
