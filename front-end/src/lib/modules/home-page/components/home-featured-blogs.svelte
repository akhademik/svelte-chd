<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte'
	import type { BlogPost } from '$lib/types/blog.type'
	import { filter_localized_items, get_localized_field } from '$lib/utils/format-data'
	import { get_blog_slug, url_for } from '$lib/utils/sanity'

	interface Props {
		posts?: BlogPost[]
	}

	let { posts = [] }: Props = $props()

	let displayPosts = $derived(filter_localized_items(posts, $locale))

	const getPostTitle = (p: BlogPost) => {
		return get_localized_field(p.title, $locale, 'CHD Journal')
	}

	const getPostExcerpt = (p: BlogPost) => {
		return get_localized_field(p.excerpt, $locale, '')
	}

	const getPostCover = (p: BlogPost) => {
		if (p.coverImg?.asset) {
			return url_for(p.coverImg).width(600).height(380).auto('format').quality(80).url()
		}
		return null
	}

	const getPostSlug = (p: BlogPost) => {
		return get_blog_slug(p, $locale)
	}

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

	const getCategoryBadgeClass = (cat: string) => {
		switch (cat) {
			case 'food':
			case 'event':
				return 'bg-amber-100 text-amber-900 border-amber-300'
			case 'stories':
			case 'story':
				return 'bg-orange-100 text-orange-900 border-orange-300'
			case 'tips':
				return 'bg-emerald-100 text-emerald-900 border-emerald-300'
			case 'places':
			case 'destination':
				return 'bg-cyan-100 text-cyan-900 border-cyan-300'
			default:
				return 'bg-surface text-foreground border-border-strong'
		}
	}
</script>

{#if displayPosts.length > 0}
	<section
		id="featured-blogs"
		class="sm:py-18 border-b border-border bg-background px-6 py-14">
		<div class="mx-auto max-w-6xl">
			<div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
				<div>
					<span class="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-secondary">
						{$LL.home_page.featured_blogs_section.subtitle()}
					</span>
					<h2 class="font-serif text-3xl font-normal text-foreground sm:text-4xl">
						{$LL.home_page.featured_blogs_section.title()}
					</h2>
				</div>
				<div class="flex items-center gap-4">
					<p class="max-w-md text-sm font-light text-foreground-muted">
						{$LL.home_page.featured_blogs_section.desc()}
					</p>
					<a
						href={`/${$locale}/blog`}
						class="hidden shrink-0 border border-foreground px-5 py-2.5 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-block">
						{$LL.home_page.featured_blogs_section.view_all()}
					</a>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each displayPosts as post (post._id)}
					{@const coverUrl = getPostCover(post)}
					{@const title = getPostTitle(post)}
					{@const excerpt = getPostExcerpt(post)}
					{@const postLink = `/${$locale}/blog/${getPostSlug(post)}`}

					<article
						class="group flex flex-col justify-between overflow-hidden border border-border/90 bg-surface text-left transition-all duration-300 hover:border-border-strong hover:shadow-xl">
						<div>
							{#if coverUrl}
								<a
									href={postLink}
									class="relative block aspect-[16/10] w-full overflow-hidden bg-background">
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
								</a>
							{/if}

							<div class="p-6">
								<div class="mb-3 flex items-center justify-between text-xs text-foreground-subtle">
									<span>{post.author || 'CHD Travel'}</span>
									<span>{post.publishedAt?.split('T')[0] || ''}</span>
								</div>

								<h3
									class="font-serif text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-secondary">
									<a
										href={postLink}
										class="hover:text-secondary">
										{title}
									</a>
								</h3>

								{#if excerpt}
									<p
										class="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-foreground-muted">
										{excerpt}
									</p>
								{/if}
							</div>
						</div>

						<div
							class="mx-6 mb-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs font-medium text-secondary">
							<a
								href={postLink}
								class="flex items-center gap-1.5 hover:underline">
								<span>{$LL.home_page.featured_blogs_section.read_article()}</span>
								<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
							</a>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-10 text-center md:hidden">
				<a
					href={`/${$locale}/blog`}
					class="inline-block border border-foreground bg-surface px-6 py-3 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background">
					{$LL.home_page.featured_blogs_section.view_all()}
				</a>
			</div>
		</div>
	</section>
{/if}
