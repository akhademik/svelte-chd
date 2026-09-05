<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		posts?: BlogPost[]
	}

	let { posts = [] }: Props = $props()

	let activeFilter = $state<string>('all')

	// Strict language filter
	let availablePosts = $derived.by(() => {
		return posts.filter(p => {
			const hasTitle = Boolean(
				p.title?.[$locale as 'vn' | 'en' | 'fr'] || p.title?.vn || p.title?.en
			)
			return hasTitle
		})
	})

	// Dynamic category list: Only show categories that have at least 1 post
	let presentCategories = $derived.by(() => {
		const categoryOrder = ['event', 'story', 'tips', 'destination']
		const found = new Set(availablePosts.map(p => p.category).filter(Boolean))
		return categoryOrder.filter(c => found.has(c as any))
	})

	let filteredPosts = $derived(
		activeFilter === 'all'
			? availablePosts
			: availablePosts.filter(post => post.category === activeFilter)
	)

	let featuredPost = $derived(availablePosts.find(p => p.isFeatured) || availablePosts[0])
	let nonFeaturedPosts = $derived(
		activeFilter === 'all' ? availablePosts.filter(p => p._id !== featuredPost?._id) : filteredPosts
	)

	const getPostTitle = (p: BlogPost) => {
		return p.title?.[$locale as 'vn'] || p.title?.vn || p.title?.en || ''
	}

	const getPostExcerpt = (p: BlogPost) => {
		return p.excerpt?.[$locale as 'vn'] || p.excerpt?.vn || p.excerpt?.en || ''
	}

	const getPostCover = (p: BlogPost) => {
		if (p.coverImg?.asset) {
			return url_for(p.coverImg).width(800).height(450).auto('format').url()
		}
		return null
	}

	const getPostSlug = (p: BlogPost) => {
		return (
			p.slug?.[$locale as 'vn' | 'en' | 'fr']?.current ||
			p.slug?.current ||
			p.slug?.vn?.current ||
			p.slug?.en?.current ||
			(typeof p.slug === 'string' ? p.slug : p._id)
		)
	}

	const getCategoryName = (cat: string) => {
		switch (cat) {
			case 'event':
				return $locale === 'vn' ? 'Sự kiện sắp diễn ra' : 'Upcoming Events'
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

	const getCategoryBadgeClass = (cat: string) => {
		switch (cat) {
			case 'event':
				return 'bg-amber-100 text-amber-900 border-amber-300'
			case 'story':
				return 'bg-orange-100 text-orange-900 border-orange-300'
			case 'tips':
				return 'bg-emerald-100 text-emerald-900 border-emerald-300'
			case 'destination':
				return 'bg-cyan-100 text-cyan-900 border-cyan-300'
			default:
				return 'bg-stone-100 text-stone-800 border-stone-300'
		}
	}
</script>

<div class="space-y-12 pb-20">
	<!-- Hero Section -->
	<section class="border-b border-stone-200/80 bg-sand-card py-12 sm:py-16">
		<div class="mx-auto max-w-6xl px-6">
			<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
				{$locale === 'vn' ? 'Góc chia sẻ' : 'Our Stories & Insights'}
			</span>
			<h1 class="font-serif text-3xl font-bold leading-tight text-moss sm:text-4xl lg:text-5xl">
				Blog CHD Travel
			</h1>
			<p class="mt-4 max-w-2xl text-sm font-light leading-relaxed text-stone-600 sm:text-base">
				{$locale === 'vn'
					? 'Cảm nhận từ những đoàn khách đã đi, sự kiện lễ hội sắp diễn ra ở Đắk Lắk, và những điều chúng tôi muốn kể ngoài lịch trình tour thông thường.'
					: 'Travel reflections, upcoming cultural festivals in Dak Lak, and local stories beyond standard itineraries.'}
			</p>

			<!-- Filter Pills: Only show categories with available posts -->
			{#if presentCategories.length > 1}
				<div class="mt-8 flex flex-wrap gap-2.5 border-t border-stone-200/80 pt-6 text-xs">
					<button
						onclick={() => (activeFilter = 'all')}
						class={`rounded-full px-5 py-2.5 font-medium transition-all ${
							activeFilter === 'all'
								? 'bg-stone-900 text-stone-50'
								: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
						}`}>
						{$locale === 'vn' ? 'Tất cả bài viết' : 'All Posts'}
					</button>
					{#each presentCategories as cat}
						<button
							onclick={() => (activeFilter = cat)}
							class={`rounded-full px-5 py-2.5 font-medium transition-all ${
								activeFilter === cat
									? 'bg-stone-900 text-stone-50'
									: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
							}`}>
							{getCategoryName(cat)}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<div class="mx-auto max-w-6xl px-6">
		<!-- Featured Post -->
		{#if activeFilter === 'all' && featuredPost}
			{@const coverImgUrl = getPostCover(featuredPost)}
			{@const featuredSlug = getPostSlug(featuredPost)}
			{@const featuredLink = `/${$locale}/blog/${featuredSlug}`}
			{@const featuredExcerpt = getPostExcerpt(featuredPost)}

			<div
				class="mb-12 grid grid-cols-1 overflow-hidden border border-stone-200 bg-sand-card text-left transition-all hover:border-stone-400 hover:shadow-md lg:grid-cols-12">
				<a
					href={featuredLink}
					class="relative flex min-h-[280px] flex-col justify-between bg-stone-900 p-8 text-white lg:col-span-6 lg:p-12">
					{#if coverImgUrl}
						<div class="absolute inset-0 z-0">
							<img
								src={coverImgUrl}
								alt={getPostTitle(featuredPost)}
								class="h-full w-full object-cover opacity-35" />
							<div
								class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/40">
							</div>
						</div>
					{/if}
					<div class="relative z-10 flex items-center justify-between">
						<span
							class={`rounded-full border px-3 py-1 text-[11px] font-medium ${getCategoryBadgeClass(featuredPost.category)}`}>
							{getCategoryName(featuredPost.category)}
						</span>
						<span class="text-xs text-stone-400">Featured</span>
					</div>
					<div class="relative z-10 mt-8">
						<h2 class="font-serif text-2xl font-normal leading-tight text-stone-100 sm:text-3xl">
							{getPostTitle(featuredPost)}
						</h2>
						{#if featuredExcerpt}
							<p class="mt-4 text-xs font-light leading-relaxed text-stone-300 sm:text-sm">
								{featuredExcerpt}
							</p>
						{/if}
					</div>
					<div class="relative z-10 mt-6 flex items-center justify-between text-xs text-stone-400">
						<span>{featuredPost.author || 'CHD Travel'}</span>
						<span>{featuredPost.publishedAt?.split('T')[0] || ''}</span>
					</div>
				</a>

				<div class="flex flex-col justify-center bg-stone-50 p-8 lg:col-span-6 lg:p-12">
					<span class="text-xs uppercase tracking-widest text-stone-400">Highlights</span>
					<p class="mt-4 font-serif text-lg italic text-stone-800">
						{$locale === 'vn'
							? '"Những trải nghiệm thực tế từ các chuyến đi cùng người bản địa Đắk Lắk."'
							: '"Authentic moments and insights gathered from local Highland journeys."'}
					</p>
					<div class="mt-8 flex items-center gap-3">
						<a
							href={featuredLink}
							class="inline-block bg-stone-900 px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-stone-800">
							{$locale === 'vn' ? 'Đọc toàn bộ bài viết →' : 'Read Full Post →'}
						</a>
					</div>
				</div>
			</div>
		{/if}

		<!-- Posts Grid -->
		{#if nonFeaturedPosts.length === 0 && !featuredPost}
			<div
				class="border border-dashed border-stone-300 bg-sand-card p-12 text-center text-sm text-stone-500">
				{$locale === 'vn' ? 'Chưa có bài viết nào.' : 'No blog posts available.'}
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each nonFeaturedPosts as post (post._id)}
					{@const cardCover = getPostCover(post)}
					{@const postSlug = getPostSlug(post)}
					{@const postLink = `/${$locale}/blog/${postSlug}`}
					{@const cardExcerpt = getPostExcerpt(post)}

					<article
						class="flex flex-col justify-between overflow-hidden border border-stone-200 bg-sand-card text-left transition-all hover:border-stone-400 hover:shadow-md">
						<div>
							{#if cardCover}
								<a
									href={postLink}
									class="block h-48 w-full overflow-hidden bg-stone-100">
									<img
										src={cardCover}
										alt={getPostTitle(post)}
										class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
								</a>
							{/if}
							<div class="p-6">
								<div class="flex items-center justify-between">
									<span
										class={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getCategoryBadgeClass(post.category)}`}>
										{getCategoryName(post.category)}
									</span>
									<span class="text-[11px] text-stone-400"
										>{post.publishedAt?.split('T')[0] || ''}</span>
								</div>

								<h3 class="mt-4 font-serif text-lg font-medium leading-snug text-stone-900">
									<a
										href={postLink}
										class="hover:text-terracotta">
										{getPostTitle(post)}
									</a>
								</h3>

								{#if cardExcerpt}
									<p class="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-stone-600">
										{cardExcerpt}
									</p>
								{/if}
							</div>
						</div>

						<div
							class="mx-6 mb-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-400">
							<span>{post.author || 'CHD Travel'}</span>
							<a
								href={postLink}
								class="font-medium text-terracotta hover:underline">
								{$locale === 'vn' ? 'Xem chi tiết →' : 'Read more →'}
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</div>
