<script lang="ts">
	import { BaseLoading } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data } from '$lib/utils/sanity'
	import HomeDayTours from './components/home-day-tours.svelte'
	import HomeFeaturedBlogs from './components/home-featured-blogs.svelte'
	import HomeFeaturedSlider from './components/home-featured-slider.svelte'
	import HomeHero from './components/home-hero.svelte'
	import HomeHighlandTours from './components/home-highland-tours.svelte'

	import { onMount } from 'svelte'

	interface Props {
		data?: any
	}

	let { data }: Props = $props()

	let dayTours = $state<Tour[]>([])
	let highlandTours = $state<Tour[]>([])
	let loading = $state(true)

	onMount(async () => {
		loading = true
		try {
			const mockDayPage = { url: { pathname: '/vn/day-tours' } } as any
			const mockHighlandPage = { url: { pathname: '/vn/highland-tours' } } as any

			const [dData, hData] = await Promise.all([
				get_sanity_data(mockDayPage),
				get_sanity_data(mockHighlandPage),
			])

			dayTours = dData || []
			highlandTours = hData || []
		} finally {
			loading = false
		}
	})

	let allTours = $derived([...dayTours, ...highlandTours])
	let featuredPosts = $derived(data?.featuredPosts || [])
</script>

{#if loading}
	<BaseLoading />
{:else}
	<HomeHero />
	<HomeFeaturedSlider tours={allTours} />
	<HomeDayTours tours={dayTours} />
	<HomeHighlandTours tours={highlandTours} />
	<HomeFeaturedBlogs posts={featuredPosts} />
{/if}
