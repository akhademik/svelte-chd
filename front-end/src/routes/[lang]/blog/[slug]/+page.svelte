<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import { locale } from '$i18n/i18n-svelte'
	import { BaseSeo } from '$lib/base'
	import BasePortableTextImage from '$lib/base/base-portable-text-image.svelte'
	import BasePortableTextListItem from '$lib/base/base-portable-text-list-item.svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const portableTextComponents = {
		types: {
			image: BasePortableTextImage,
		},
		listItem: {
			normal: BasePortableTextListItem,
			bullet: BasePortableTextListItem,
			number: BasePortableTextListItem,
		},
	}

	let post: BlogPost = $derived(data.post)
	let title = $derived(
		post?.title?.[$locale as 'vn' | 'en' | 'fr'] || post?.title?.vn || post?.title?.en || ''
	)
	let excerpt = $derived(
		post?.excerpt?.[$locale as 'vn' | 'en' | 'fr'] || post?.excerpt?.vn || post?.excerpt?.en || ''
	)
	let content = $derived(
		post?.content?.[$locale as 'vn' | 'en' | 'fr'] || post?.content?.vn || post?.content?.en || []
	)

	let allImages = $derived.by(() => {
		const list: any[] = []
		if (post?.coverImg?.asset) {
			list.push(post.coverImg)
		}
		const rawAlbum = post?.imgTour || post?.img_tour || []
		if (Array.isArray(rawAlbum) && rawAlbum.length > 0) {
			rawAlbum.forEach((img: any) => {
				if (img?.asset) list.push(img)
			})
		}
		return list
	})

	let activeImageIndex = $state(0)

	let primaryCoverUrl = $derived(
		allImages.length > 0
			? url_for(allImages[0]).width(1200).height(650).auto('format').quality(85).url()
			: undefined
	)

	const getCategoryName = (cat: string) => {
		switch (cat) {
			case 'event':
				return $locale === 'vn' ? 'Sự kiện sắp diễn ra' : 'Upcoming Event'
			case 'story':
				return $locale === 'vn' ? 'Cảm nhận đoàn khách' : 'Traveler Stories'
			case 'tips':
				return $locale === 'vn' ? 'Kinh nghiệm du lịch' : 'Travel Tips'
			case 'destination':
				return $locale === 'vn' ? 'Điểm đến Tây Nguyên' : 'Highland Destinations'
			default:
				return 'Blog'
		}
	}
</script>

<BaseSeo
	{title}
	description={excerpt || undefined}
	ogImage={primaryCoverUrl}
	ogType="article" />

<div class="space-y-12 pb-24">
	<!-- Hero Section -->
	<section class="border-b border-stone-200/80 bg-sand-card py-12 sm:py-16">
		<div class="mx-auto max-w-4xl px-6">
			<!-- Breadcrumb & Back -->
			<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
				<nav class="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500">
					<a
						href={`/${$locale}`}
						class="transition-colors hover:text-stone-900">
						{$locale === 'vn' ? 'Trang chủ' : 'Home'}
					</a>
					<span>/</span>
					<a
						href={`/${$locale}/blog`}
						class="transition-colors hover:text-stone-900">
						Blog
					</a>
					<span>/</span>
					<span class="font-medium text-stone-900">{getCategoryName(post.category)}</span>
				</nav>

				<a
					href={`/${$locale}/blog`}
					class="inline-flex items-center gap-2 border border-stone-300 bg-white px-4 py-2 text-xs uppercase tracking-wider text-stone-700 shadow-sm transition-all hover:border-stone-900 hover:text-stone-900">
					← {$locale === 'vn' ? 'Tất cả bài viết' : 'Back to blog'}
				</a>
			</div>

			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<span
						class="bg-stone-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
						{getCategoryName(post.category)}
					</span>
					<span class="text-xs text-stone-500">
						{post.publishedAt?.split('T')[0] || ''}
					</span>
				</div>

				<h1 class="font-serif text-3xl font-bold leading-tight text-moss sm:text-4xl lg:text-5xl">
					{title}
				</h1>

				{#if excerpt}
					<p class="text-base font-light italic leading-relaxed text-stone-600 sm:text-lg">
						"{excerpt}"
					</p>
				{/if}

				<div
					class="flex items-center gap-2 border-t border-stone-200/80 pt-2 text-xs text-stone-500">
					<span>{$locale === 'vn' ? 'Tác giả:' : 'Author:'}</span>
					<span class="font-medium text-stone-800">{post.author || 'CHD Travel Team'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Article Content -->
	<div class="mx-auto max-w-4xl px-6">
		<article class="space-y-10">
			<!-- Unified Image Gallery (Cover + Album merged) -->
			{#if allImages.length > 0}
				<div class="space-y-3 overflow-hidden border border-stone-200 bg-stone-900 p-2 shadow-md">
					<div class="relative aspect-[16/10] w-full overflow-hidden bg-stone-950 sm:aspect-[16/9]">
						{#key activeImageIndex}
							<img
								transition:fade={{ duration: 250 }}
								src={url_for(allImages[activeImageIndex])
									.width(1200)
									.height(680)
									.auto('format')
									.quality(85)
									.url()}
								alt={allImages[activeImageIndex]?.caption ||
									allImages[activeImageIndex]?.alt ||
									title}
								class="absolute inset-0 h-full w-full object-cover" />
						{/key}

						{#if allImages.length > 1}
							<button
								type="button"
								onclick={() =>
									(activeImageIndex = (activeImageIndex - 1 + allImages.length) % allImages.length)}
								class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
								aria-label="Previous photo">
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
								class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
								aria-label="Next photo">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
							</button>
							<div
								class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-light text-stone-200 backdrop-blur-sm">
								{activeImageIndex + 1} / {allImages.length}
							</div>
						{/if}
					</div>

					<!-- Thumbnails -->
					{#if allImages.length > 1}
						<div class="flex gap-2 overflow-x-auto p-1">
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
										alt={imgItem?.caption || imgItem?.alt || `Thumbnail ${idx + 1}`}
										class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Blog Content -->
			{#if content && (Array.isArray(content) ? content.length > 0 : true)}
				<div
					class="space-y-6 border border-stone-200/90 bg-sand-card p-6 text-sm font-light leading-relaxed text-stone-800 sm:p-10 sm:text-base">
					<PortableText
						value={content}
						components={portableTextComponents} />
				</div>
			{/if}

			<!-- Bottom Back Navigation -->
			<div class="flex items-center justify-between border-t border-stone-200 pt-8">
				<a
					href={`/${$locale}/blog`}
					class="inline-flex items-center gap-2 border border-stone-800 px-6 py-3 text-xs uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white">
					← {$locale === 'vn' ? 'Xem các bài viết khác' : 'All articles'}
				</a>
			</div>
		</article>
	</div>
</div>
