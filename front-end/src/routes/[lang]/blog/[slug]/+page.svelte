<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { BaseJsonLd, BaseSeo } from '$lib/base'
	import { portableTextComponents } from '$lib/utils/portable-text-components'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'
	import { fade } from 'svelte/transition'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

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
		{ name: $locale === 'vn' ? 'Trang chủ' : 'Home', item: `https://chd.travel/${$locale}` },
		{ name: 'CHD Journal', item: `https://chd.travel/${$locale}/blog` },
		{ name: title, item: `https://chd.travel/${$locale}/blog/${post?.slug?.current || ''}` },
	])
</script>

<BaseSeo
	{title}
	description={excerpt || undefined}
	ogImage={primaryCoverUrl}
	ogType="article" />

<BaseJsonLd
	{post}
	breadcrumbs={breadcrumbItems}
	url={`https://chd.travel/${$locale}/blog/${post?.slug?.current || ''}`} />

<div class="space-y-12 pb-24">
	<!-- Hero Section -->
	<!-- Hero Section -->
	<section class="border-b border-border bg-surface py-12 sm:py-16">
		<div class="mx-auto max-w-4xl px-6">
			<!-- Breadcrumb & Back -->
			<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
				<nav class="flex items-center gap-2 text-xs uppercase tracking-wider text-foreground-muted">
					<a
						href={`/${$locale}`}
						class="transition-colors hover:text-foreground">
						{$locale === 'vn' ? 'Trang chủ' : 'Home'}
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

				<a
					href={`/${$locale}/blog`}
					class="inline-flex items-center gap-2 border border-border-strong bg-surface px-4 py-2 text-xs uppercase tracking-wider text-foreground shadow-sm transition-all hover:border-foreground hover:text-foreground">
					{$LL.blog_page.all_articles_btn()}
				</a>
			</div>

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
					class="flex items-center gap-2 border-t border-border pt-2 text-xs text-foreground-muted">
					<span>{$LL.blog_page.author_prefix()}</span>
					<span class="font-medium text-foreground">{post.author || 'CHD Travel Team'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Main Article Content -->
	<div class="mx-auto max-w-4xl px-6">
		<article class="space-y-10">
			<!-- Unified Image Gallery (Cover + Album merged) -->
			{#if allImages.length > 0}
				<div class="space-y-3 overflow-hidden border border-border bg-inverse p-2 shadow-md">
					<div
						class="relative aspect-[16/10] w-full overflow-hidden bg-inverse-dark sm:aspect-[16/9]">
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
								class="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-light text-inverse-foreground backdrop-blur-sm">
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
											? 'scale-105 border-secondary opacity-100'
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
					class="space-y-6 border border-border/90 bg-surface p-6 text-sm font-light leading-relaxed text-foreground sm:p-10 sm:text-base">
					<PortableText
						value={content}
						components={portableTextComponents} />
				</div>
			{/if}

			<!-- Bottom Back Navigation -->
			<div class="flex items-center justify-between border-t border-border pt-8">
				<a
					href={`/${$locale}/blog`}
					class="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-inverse hover:text-white">
					{$LL.blog_page.all_articles_btn()}
				</a>
			</div>
		</article>
	</div>
</div>
