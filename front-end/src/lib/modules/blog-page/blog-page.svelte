<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		posts?: BlogPost[]
	}

	let { posts = [] }: Props = $props()

	let activeFilter = $state<'all' | 'event' | 'story' | 'tips' | 'destination'>('all')

	// Mock sample fallback posts if Sanity has not created any blog post yet
	const fallbackPosts: BlogPost[] = [
		{
			_id: 'fb-1',
			title: {
				vn: 'Lễ hội Cà phê Buôn Ma Thuột 2026: Những điểm mới không thể bỏ qua',
				en: 'Buon Ma Thuot Coffee Festival 2026: Highlights & New Experiences',
				fr: 'Festival du Café de Buon Ma Thuot 2026: Les Nouveautés',
			},
			slug: {
				vn: { current: 'le-hoi-ca-phe-buon-ma-thuot-2026' },
				en: { current: 'buon-ma-thuot-coffee-festival-2026' },
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
				vn: 'Ký sự chuyến đi 2 ngày 1 đêm cùng đoàn khách Hà Nội: Ăn cơm lam gà nướng, uống rượu cần và nghe già làng kể khan.',
				en: 'Reflections from our 2-day journey with guests from Hanoi: Bamboo-cooked rice, grilled chicken, and ancient folk tales.',
			},
			publishedAt: '2026-02-15',
			author: 'Trần Hoài Nam',
		},
		{
			_id: 'fb-3',
			title: {
				vn: 'Kinh nghiệm đi Đắk Lắk mùa hoa cà phê nở trắng trời (Tháng 2 - Tháng 4)',
				en: 'Travel Guide: Blooming White Coffee Blossom Season in Dak Lak',
				fr: 'Guide: La Saison des Fleurs de Café à Dak Lak',
			},
			slug: {
				vn: { current: 'kinh-nghiem-di-dak-lak-mua-hoa-ca-phe' },
				en: { current: 'dak-lak-coffee-blossom-season-guide' },
			},
			category: 'tips',
			excerpt: {
				vn: 'Thời điểm hoa nở rộ nhất, các cung đường chụp ảnh đẹp và lưu ý khi ghé thăm trang trại cà phê của người dân.',
				en: 'Best blooming windows, photography routes, and respectful etiquette when visiting local coffee plantations.',
			},
			publishedAt: '2026-01-20',
			author: 'H’Linh Niê',
		},
		{
			_id: 'fb-4',
			title: {
				vn: 'Thác Dray Nur & Dray Sap: Cặp thác hùng vỹ trên dòng Sêrêpôk',
				en: 'Dray Nur & Dray Sap: Majestic Twin Falls on the Serepok River',
				fr: 'Dray Nur et Dray Sap: Les Cascades Jumelles de Serepok',
			},
			slug: {
				vn: { current: 'thac-dray-nur-dray-sap-serepok' },
				en: { current: 'dray-nur-dray-sap-waterfalls' },
			},
			category: 'destination',
			excerpt: {
				vn: 'Hướng dẫn đường đi, thời gian lý tưởng để chèo thuyền kayak và khám phá hang đá núi lửa cổ xưa.',
				en: 'How to get there, best times for kayaking, and exploring the ancient volcanic caves.',
			},
			publishedAt: '2025-12-10',
			author: 'Y Thịnh Ê Ban',
		},
	]

	let displayPosts = $derived(posts && posts.length > 0 ? posts : fallbackPosts)

	let filteredPosts = $derived(
		activeFilter === 'all'
			? displayPosts
			: displayPosts.filter(post => post.category === activeFilter)
	)

	let featuredPost = $derived(displayPosts.find(p => p.isFeatured) || displayPosts[0])
	let nonFeaturedPosts = $derived(
		activeFilter === 'all' ? displayPosts.filter(p => p._id !== featuredPost?._id) : filteredPosts
	)

	const getPostTitle = (p: BlogPost) => {
		return p.title?.[$locale as 'vn'] || p.title?.vn || p.title?.en || 'Bài viết'
	}

	const getPostExcerpt = (p: BlogPost) => {
		return p.excerpt?.[$locale as 'vn'] || p.excerpt?.vn || p.excerpt?.en || ''
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
	<section class="border-b border-stone-200/80 bg-white py-12 sm:py-16">
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
			<div
				class="mb-12 grid grid-cols-1 overflow-hidden border border-stone-200 bg-white transition-all hover:border-stone-400 lg:grid-cols-12">
				<div
					class="relative flex min-h-[260px] flex-col justify-between bg-stone-900 p-8 text-white lg:col-span-6 lg:p-12">
					<div class="flex items-center justify-between">
						<span
							class={`rounded-full border px-3 py-1 text-[11px] font-medium ${getCategoryBadgeClass(featuredPost.category)}`}>
							{getCategoryName(featuredPost.category)}
						</span>
						<span class="text-xs text-stone-400">Featured</span>
					</div>
					<div class="mt-8">
						<h2 class="font-serif text-2xl font-normal leading-tight text-stone-100 sm:text-3xl">
							{getPostTitle(featuredPost)}
						</h2>
						<p class="mt-4 text-xs font-light leading-relaxed text-stone-300 sm:text-sm">
							{getPostExcerpt(featuredPost)}
						</p>
					</div>
					<div class="mt-6 flex items-center justify-between text-xs text-stone-400">
						<span>{featuredPost.author || 'CHD Travel'}</span>
						<span>{featuredPost.publishedAt || ''}</span>
					</div>
				</div>

				<div class="flex flex-col justify-center bg-stone-50 p-8 lg:col-span-6 lg:p-12">
					<span class="text-xs uppercase tracking-widest text-stone-400">Highlights</span>
					<p class="mt-4 font-serif text-lg italic text-stone-800">
						{$locale === 'vn'
							? '"Những trải nghiệm thực tế từ các chuyến đi cùng người bản địa Đắk Lắk."'
							: '"Authentic moments and insights gathered from local Highland journeys."'}
					</p>
					<div class="mt-8">
						<a
							href={`/${$locale}/contact`}
							class="inline-block bg-stone-900 px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-stone-800">
							{$locale === 'vn' ? 'Liên hệ tham gia' : 'Inquire with Us'}
						</a>
					</div>
				</div>
			</div>
		{/if}

		<!-- Posts Grid -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each nonFeaturedPosts as post (post._id)}
				<article
					class="flex flex-col justify-between border border-stone-200 bg-white p-6 transition-all hover:border-stone-400">
					<div>
						<div class="flex items-center justify-between">
							<span
								class={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getCategoryBadgeClass(post.category)}`}>
								{getCategoryName(post.category)}
							</span>
							<span class="text-[11px] text-stone-400">{post.publishedAt || ''}</span>
						</div>

						<h3 class="mt-4 font-serif text-lg font-medium leading-snug text-stone-900">
							{getPostTitle(post)}
						</h3>

						<p class="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-stone-600">
							{getPostExcerpt(post)}
						</p>
					</div>

					<div
						class="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-400">
						<span>{post.author || 'CHD Travel'}</span>
						<span class="font-medium text-terracotta">CHD Travel</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</div>
