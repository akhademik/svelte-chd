<script lang="ts">
	import { page } from '$app/stores'
	import { PortableText } from '@portabletext/svelte'
	import { locale } from '$i18n/i18n-svelte'

	import type { Locales } from '$i18n/i18n-types'
	import { blog_modal } from '$lib/stores/modal-store'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'
	import { fade, scale } from 'svelte/transition'

	import BasePortableTextImage from './base-portable-text-image.svelte'
	import BasePortableTextListItem from './base-portable-text-list-item.svelte'

	let isOpen = $derived($blog_modal.isOpen)
	let post = $derived($blog_modal.post as BlogPost | null)
	let activeLang = $derived(($page.params.lang as Locales) || $locale || 'en')

	let title = $derived(
		post?.title?.[activeLang] || post?.title?.vn || post?.title?.en || post?.title?.fr || 'Blog'
	)

	let excerpt = $derived(
		post?.excerpt?.[activeLang] || post?.excerpt?.vn || post?.excerpt?.en || post?.excerpt?.fr || ''
	)

	let content = $derived(
		post?.content?.[activeLang] || post?.content?.vn || post?.content?.en || post?.content?.fr || []
	)

	let imgCover = $derived(post?.coverImg)
	let imgTour = $derived(post?.img_tour || post?.imgTour || (post as any)?.album || [])

	let allImages = $derived.by(() => {
		const imgs: any[] = []
		const seenRefs = new Set<string>()

		const addImg = (img: any) => {
			if (!img) return
			const ref =
				img?.asset?._ref || img?.asset?._id || img?._id || (typeof img === 'string' ? img : null)
			if (img?.asset || (typeof img === 'object' && (img._ref || img.url))) {
				if (ref && seenRefs.has(ref)) return
				if (ref) seenRefs.add(ref)
				imgs.push(img)
			}
		}

		// 1. Add Cover Image
		addImg(imgCover)

		// 2. Add Album Images
		if (Array.isArray(imgTour) && imgTour.length > 0) {
			imgTour.forEach(img => addImg(img))
		}

		// 3. Extract any image blocks embedded inside Rich Content
		if (Array.isArray(content) && content.length > 0) {
			content.forEach(block => {
				if (block?._type === 'image' && block?.asset) {
					addImg(block)
				}
			})
		}

		return imgs
	})

	let activeImageIndex = $state(0)

	$effect(() => {
		if (isOpen && post) {
			activeImageIndex = 0
			if (typeof document !== 'undefined') {
				document.body.style.overflow = 'hidden'
			}

			return () => {
				if (typeof document !== 'undefined') {
					document.body.style.overflow = ''
				}
			}
		}
	})

	const close = () => {
		blog_modal.close()
	}

	const handleModalKeydown = (e: KeyboardEvent) => {
		if (!isOpen) return
		if (e.key === 'Escape') {
			close()
		} else if (e.key === 'ArrowLeft' && allImages.length > 1) {
			activeImageIndex = (activeImageIndex - 1 + allImages.length) % allImages.length
		} else if (e.key === 'ArrowRight' && allImages.length > 1) {
			activeImageIndex = (activeImageIndex + 1) % allImages.length
		}
	}

	const getCategoryName = (cat?: string) => {
		switch (cat) {
			case 'event':
				return activeLang === 'vn' ? 'Sự kiện sắp diễn ra' : 'Upcoming Event'
			case 'story':
				return activeLang === 'vn' ? 'Cảm nhận đoàn khách' : 'Traveler Stories'
			case 'tips':
				return activeLang === 'vn' ? 'Kinh nghiệm du lịch' : 'Travel Tips'
			case 'destination':
				return activeLang === 'vn' ? 'Điểm đến Tây Nguyên' : 'Highland Destinations'
			default:
				return 'Blog'
		}
	}
</script>

<svelte:window onkeydown={handleModalKeydown} />

{#if isOpen && post}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-0 backdrop-blur-sm sm:p-4 md:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-blog-title">
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent focus:outline-none"
			aria-label="Close modal overlay"
			onclick={close}
			tabindex="-1"></button>
		<div
			transition:scale={{ start: 0.96, duration: 200 }}
			class="relative z-10 flex h-full max-h-screen w-full max-w-4xl flex-col overflow-hidden rounded-none border-0 bg-stone-50 text-stone-900 shadow-2xl sm:h-auto sm:max-h-[90vh] sm:border sm:border-stone-200">
			<!-- Modal Header (Sticky top) -->
			<div
				class="sticky top-0 z-20 flex items-center justify-between border-b border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
				<div class="flex items-center gap-3">
					<span
						class="bg-stone-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-100">
						{getCategoryName(post.category)}
					</span>
					<span class="text-xs text-stone-400">
						{post.publishedAt?.split('T')[0] || ''}
					</span>
				</div>
				<button
					onclick={close}
					class="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-900"
					aria-label="Close">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
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

			<!-- Modal Body (Scrollable) -->
			<div class="space-y-6 overflow-y-auto p-4 sm:space-y-8 sm:p-6 md:p-8">
				<div>
					<h2
						id="modal-blog-title"
						class="font-serif text-2xl font-normal leading-tight text-stone-900 sm:text-3xl lg:text-4xl">
						{title}
					</h2>
					{#if excerpt}
						<p class="mt-3 text-sm font-light italic leading-relaxed text-stone-600 sm:text-base">
							{excerpt}
						</p>
					{/if}
					<div class="mt-3 flex items-center gap-4 text-xs text-stone-500">
						<span>{post.author || 'CHD Travel Team'}</span>
						<span>•</span>
						<span>CHD Travel Blog</span>
					</div>
				</div>

				<!-- Image Gallery / Cover -->
				{#if allImages.length > 0}
					<div class="space-y-3">
						<div
							class="relative aspect-[16/10] w-full overflow-hidden bg-stone-900 shadow-sm sm:aspect-[16/9]">
							{#key activeImageIndex}
								<img
									transition:fade={{ duration: 200 }}
									src={url_for(allImages[activeImageIndex])
										.width(1000)
										.height(625)
										.auto('format')
										.quality(85)
										.url()}
									alt={allImages[activeImageIndex]?.caption || title}
									class="absolute inset-0 h-full w-full object-cover" />
							{/key}

							{#if allImages.length > 1}
								<button
									type="button"
									onclick={() =>
										(activeImageIndex =
											(activeImageIndex - 1 + allImages.length) % allImages.length)}
									class="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
									aria-label="Previous image">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
								</button>
								<button
									type="button"
									onclick={() => (activeImageIndex = (activeImageIndex + 1) % allImages.length)}
									class="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
									aria-label="Next image">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
								</button>
								<div
									class="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-light text-white backdrop-blur-sm">
									{activeImageIndex + 1} / {allImages.length}
								</div>
							{/if}
						</div>

						<!-- Thumbnails -->
						{#if allImages.length > 1}
							<div class="flex gap-2.5 overflow-x-auto pb-1">
								{#each allImages as imgItem, idx}
									<button
										type="button"
										onclick={() => (activeImageIndex = idx)}
										class={`relative aspect-[16/10] h-16 shrink-0 overflow-hidden border-2 transition-all ${
											activeImageIndex === idx
												? 'scale-105 border-terracotta opacity-100'
												: 'border-transparent opacity-60 hover:opacity-100'
										}`}>
										<img
											src={url_for(imgItem).width(160).height(100).auto('format').quality(70).url()}
											alt={`Thumbnail ${idx + 1}`}
											class="h-full w-full object-cover" />
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<!-- Rich Text Content (PortableText) -->
				{#if content && (Array.isArray(content) ? content.length > 0 : true)}
					<div
						class="prose prose-stone max-w-none text-sm font-light leading-relaxed text-stone-800">
						<PortableText
							value={content}
							components={{
								types: {
									image: BasePortableTextImage,
								},
								listItem: {
									normal: BasePortableTextListItem,
									bullet: BasePortableTextListItem,
									number: BasePortableTextListItem,
								},
							}} />
					</div>
				{/if}
			</div>

			<!-- Modal Footer -->
			<div
				class="sticky bottom-0 z-10 flex items-center justify-end gap-3 border-t border-stone-200 bg-white px-4 py-3.5 sm:px-6 sm:py-4">
				<button
					onclick={close}
					class="bg-stone-900 px-6 py-2.5 text-xs uppercase tracking-widest text-stone-50 shadow-sm transition-colors hover:bg-stone-800">
					{activeLang === 'vn' ? 'Đóng' : activeLang === 'fr' ? 'Fermer' : 'Close'}
				</button>
			</div>
		</div>
	</div>
{/if}
