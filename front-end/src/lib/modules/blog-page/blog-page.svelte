<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'

	import { blog_modal } from '$lib/stores/modal-store'

	interface Props {
		posts?: BlogPost[]
	}

	let { posts = [] }: Props = $props()

	let activeFilter = $state<'all' | 'event' | 'story' | 'tips' | 'destination'>('all')

	// Fallback mock posts only if no post exists in Sanity
	const fallbackPosts: BlogPost[] = [
		{
			_id: 'fb-1',
			title: {
				vn: 'Lễ hội Cà phê Buôn Ma Thuột: Điểm hẹn văn hoá Tây Nguyên',
				en: 'Buon Ma Thuot Coffee Festival: The Central Highlands Cultural Gathering',
				fr: 'Festival du Café de Buon Ma Thuot: Rendez-vous Culturel',
			},
			slug: {
				vn: { current: 'le-hoi-ca-phe-buon-ma-thuot' },
				en: { current: 'buon-ma-thuot-coffee-festival' },
			},
			category: 'event',
			excerpt: {
				vn: 'Hội thi rang xay cà phê đặc sản, triển lãm văn hoá cồng chiêng và các tour trải nghiệm nông hộ khép kín quanh Đắk Lắk.',
				en: 'Specialty coffee roasting competitions, gong performances, and immersive farm tours across Dak Lak.',
			},
			isFeatured: true,
			publishedAt: '2026-03-01',
			author: 'CHD Travel Team',
		},
		{
			_id: 'fb-2',
			title: {
				vn: 'Một đêm ở nhà dài buôn Jun: Khi tiếng cồng chiêng vang bên bếp lửa',
				en: 'A Night at Buon Jun Longhouse: Gong Rhythms by the Fire',
				fr: 'Une Nuit dans la Maison Longue de Buon Jun',
			},
			slug: {
				vn: { current: 'mot-dem-o-nha-dai-buon-jun' },
				en: { current: 'a-night-at-buon-jun-longhouse' },
			},
			category: 'story',
			excerpt: {
				vn: 'Ký sự chuyến đi 2 ngày 1 đêm cùng đoàn khách: Ăn cơm lam gà nướng, uống rượu cần và nghe già làng kể khan.',
				en: 'Reflections from our 2-day journey: Bamboo-cooked rice, grilled chicken, and ancient folk tales.',
			},
			publishedAt: '2026-02-15',
			author: 'Trần Hoài Nam',
		},
	]

	// Strict language filter: Only show posts that actually have title and content/excerpt in the current language
	let availablePosts = $derived.by(() => {
		const rawPosts = posts && posts.length > 0 ? posts : fallbackPosts
		return rawPosts.filter(p => {
			const hasTitle = Boolean(p.title?.[$locale as 'vn' | 'en' | 'fr'])
			return hasTitle
		})
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
		return p.title?.[$locale as 'vn'] || ''
	}

	const getPostExcerpt = (p: BlogPost) => {
		return p.excerpt?.[$locale as 'vn'] || ''
	}

	const getPostCover = (p: BlogPost) => {
		if (p.coverImg?.asset) {
			return url_for(p.coverImg).width(800).height(450).auto('format').url()
		}
		return null
	}

	const openBlogDetail = (p: BlogPost) => {
		blog_modal.open(p)
	}

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
			<h1
				class="font-serif text-3xl font-normal leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
				Blog CHD Travel
			</h1>
			<p class="mt-4 max-w-2xl text-sm font-light leading-relaxed text-stone-600 sm:text-base">
				{$locale === 'vn'
					? 'Cảm nhận từ những đoàn khách đã đi, sự kiện lễ hội sắp diễn ra ở Đắk Lắk, và những điều chúng tôi muốn kể ngoài lịch trình tour thông thường.'
					: 'Travel reflections, upcoming cultural festivals in Dak Lak, and local stories beyond standard itineraries.'}
			</p>

			<!-- Filter Pills -->
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
				<button
					onclick={() => (activeFilter = 'event')}
					class={`rounded-full px-5 py-2.5 font-medium transition-all ${
						activeFilter === 'event'
							? 'bg-stone-900 text-stone-50'
							: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
					}`}>
					{$locale === 'vn' ? 'Sự kiện sắp diễn ra' : 'Upcoming Events'}
				</button>
				<button
					onclick={() => (activeFilter = 'story')}
					class={`rounded-full px-5 py-2.5 font-medium transition-all ${
						activeFilter === 'story'
							? 'bg-stone-900 text-stone-50'
							: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
					}`}>
					{$locale === 'vn' ? 'Cảm nhận đoàn khách' : 'Traveler Stories'}
				</button>
				<button
					onclick={() => (activeFilter = 'tips')}
					class={`rounded-full px-5 py-2.5 font-medium transition-all ${
						activeFilter === 'tips'
							? 'bg-stone-900 text-stone-50'
							: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
					}`}>
					{$locale === 'vn' ? 'Kinh nghiệm du lịch' : 'Travel Tips'}
				</button>
				<button
					onclick={() => (activeFilter = 'destination')}
					class={`rounded-full px-5 py-2.5 font-medium transition-all ${
						activeFilter === 'destination'
							? 'bg-stone-900 text-stone-50'
							: 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'
					}`}>
					{$locale === 'vn' ? 'Điểm đến Tây Nguyên' : 'Highland Destinations'}
				</button>
			</div>
		</div>
	</section>

	<div class="mx-auto max-w-6xl px-6">
		<!-- Featured Post (when All is selected and featured exists) -->
		{#if activeFilter === 'all' && featuredPost}
			{@const coverImgUrl = getPostCover(featuredPost)}
			<div
				role="button"
				tabindex="0"
				onclick={() => openBlogDetail(featuredPost)}
				onkeydown={e => (e.key === 'Enter' || e.key === ' ') && openBlogDetail(featuredPost)}
				class="mb-12 grid cursor-pointer grid-cols-1 overflow-hidden border border-stone-200 bg-sand-card text-left transition-all hover:border-stone-400 hover:shadow-md lg:grid-cols-12">
				<div
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
						<p class="mt-4 text-xs font-light leading-relaxed text-stone-300 sm:text-sm">
							{getPostExcerpt(featuredPost)}
						</p>
					</div>
					<div class="relative z-10 mt-6 flex items-center justify-between text-xs text-stone-400">
						<span>{featuredPost.author || 'CHD Travel'}</span>
						<span>{featuredPost.publishedAt?.split('T')[0] || ''}</span>
					</div>
				</div>

				<div class="flex flex-col justify-center bg-stone-50 p-8 lg:col-span-6 lg:p-12">
					<span class="text-xs uppercase tracking-widest text-stone-400">Highlights</span>
					<p class="mt-4 font-serif text-lg italic text-stone-800">
						{$locale === 'vn'
							? '"Những trải nghiệm thực tế từ các chuyến đi cùng người bản địa Đắk Lắk."'
							: '"Authentic moments and insights gathered from local Highland journeys."'}
					</p>
					<div class="mt-8 flex items-center gap-3">
						<span
							class="inline-block bg-stone-900 px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-stone-800">
							{$locale === 'vn' ? 'Đọc toàn bộ bài viết →' : 'Read Full Post →'}
						</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Posts Grid -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each nonFeaturedPosts as post (post._id)}
				{@const cardCover = getPostCover(post)}
				<div
					role="button"
					tabindex="0"
					onclick={() => openBlogDetail(post)}
					onkeydown={e => (e.key === 'Enter' || e.key === ' ') && openBlogDetail(post)}
					class="flex cursor-pointer flex-col justify-between overflow-hidden border border-stone-200 bg-sand-card text-left transition-all hover:border-stone-400 hover:shadow-md">
					{#if cardCover}
						<div class="h-48 w-full overflow-hidden bg-stone-100">
							<img
								src={cardCover}
								alt={getPostTitle(post)}
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
						</div>
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
							{getPostTitle(post)}
						</h3>

						<p class="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-stone-600">
							{getPostExcerpt(post)}
						</p>
					</div>

					<div
						class="mx-6 mb-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-400">
						<span>{post.author || 'CHD Travel'}</span>
						<span class="font-medium text-terracotta hover:underline">
							{$locale === 'vn' ? 'Xem chi tiết →' : 'Read more →'}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
