<script lang="ts">
	import { locale } from '$i18n/i18n-svelte'
	import { blog_modal } from '$lib/stores/modal-store'
	import type { BlogPost } from '$lib/types/blog.type'
	import { url_for } from '$lib/utils/sanity'

	interface Props {
		posts?: BlogPost[]
	}

	let { posts = [] }: Props = $props()

	let displayPosts = $derived.by(() => {
		if (!posts || posts.length === 0) return []
		return posts.filter(p =>
			Boolean(p.title?.[$locale as 'vn' | 'en' | 'fr'] || p.title?.vn || p.title?.en)
		)
	})

	const getPostTitle = (p: BlogPost) => {
		return p.title?.[$locale as 'vn'] || p.title?.vn || p.title?.en || p.title?.fr || ''
	}

	const getPostExcerpt = (p: BlogPost) => {
		return p.excerpt?.[$locale as 'vn'] || p.excerpt?.vn || p.excerpt?.en || p.excerpt?.fr || ''
	}

	const getPostCover = (p: BlogPost) => {
		if (p.coverImg?.asset) {
			return url_for(p.coverImg).width(600).height(380).auto('format').quality(80).url()
		}
		return null
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

{#if displayPosts.length > 0}
	<section
		id="featured-blogs"
		class="border-b border-stone-200 bg-sand px-6 py-24">
		<div class="mx-auto max-w-6xl">
			<div class="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<div>
					<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
						{$locale === 'vn' ? 'Góc Nhìn & Trải Nghiệm' : 'Stories & Insights'}
					</span>
					<h2 class="font-serif text-3xl font-normal text-stone-900 sm:text-4xl">
						{$locale === 'vn'
							? 'Bài Viết Nổi Bật'
							: $locale === 'fr'
								? 'Articles en Vedette'
								: 'Featured Stories'}
					</h2>
				</div>
				<div class="flex items-center gap-4">
					<p class="max-w-md text-sm font-light text-stone-600">
						{$locale === 'vn'
							? 'Những câu chuyện sống động, kinh nghiệm du lịch và khoảnh khắc văn hoá bản địa đặc sắc.'
							: 'Authentic moments, local insights, and cultural highlights from our journeys across the Highlands.'}
					</p>
					<a
						href={`/${$locale}/blog`}
						class="hidden shrink-0 border border-stone-900 px-5 py-2.5 text-xs uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white md:inline-block">
						{$locale === 'vn' ? 'Xem tất cả bài viết →' : 'View All Posts →'}
					</a>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each displayPosts as post (post._id)}
					{@const coverUrl = getPostCover(post)}
					{@const title = getPostTitle(post)}
					{@const excerpt = getPostExcerpt(post)}

					<div
						role="button"
						tabindex="0"
						onclick={() => blog_modal.open(post)}
						onkeydown={e => (e.key === 'Enter' || e.key === ' ') && blog_modal.open(post)}
						class="group flex cursor-pointer flex-col justify-between overflow-hidden border border-stone-200/90 bg-sand-card text-left transition-all duration-300 hover:border-stone-400 hover:shadow-xl">
						<div>
							{#if coverUrl}
								<div class="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
									<img
										src={coverUrl}
										alt={title}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
									<div class="absolute left-3 top-3">
										<span
											class={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium shadow-sm backdrop-blur-md ${getCategoryBadgeClass(post.category)}`}>
											{getCategoryName(post.category)}
										</span>
									</div>
								</div>
							{/if}

							<div class="p-6">
								<div class="mb-3 flex items-center justify-between text-xs text-stone-400">
									<span>{post.author || 'CHD Travel'}</span>
									<span>{post.publishedAt?.split('T')[0] || ''}</span>
								</div>

								<h3
									class="font-serif text-lg font-medium leading-snug text-stone-900 transition-colors group-hover:text-terracotta">
									{title}
								</h3>

								{#if excerpt}
									<p class="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-stone-600">
										{excerpt}
									</p>
								{/if}
							</div>
						</div>

						<div
							class="mx-6 mb-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs font-medium text-terracotta">
							<span>{$locale === 'vn' ? 'Đọc bài viết' : 'Read Article'}</span>
							<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-10 text-center md:hidden">
				<a
					href={`/${$locale}/blog`}
					class="inline-block border border-stone-900 bg-white px-6 py-3 text-xs uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white">
					{$locale === 'vn' ? 'Xem tất cả bài viết →' : 'View All Posts →'}
				</a>
			</div>
		</div>
	</section>
{/if}
