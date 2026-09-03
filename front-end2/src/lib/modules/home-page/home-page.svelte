<script lang="ts">
	import { BaseLoading } from '$lib/base'
	import type { Tour } from '$lib/types/tour.type'
	import { get_sanity_data } from '$lib/utils/sanity'
	import HomeContact from './components/home-contact.svelte'
	import HomeDayTours from './components/home-day-tours.svelte'
	import HomeFeaturedSlider from './components/home-featured-slider.svelte'
	import HomeHero from './components/home-hero.svelte'
	import HomeHighlandTours from './components/home-highland-tours.svelte'

	interface Props {
		data?: any
	}

	let { data }: Props = $props()

	let dayTours = $state<Tour[]>([])
	let highlandTours = $state<Tour[]>([])
	let loading = $state(true)

	$effect(() => {
		const fetchAll = async () => {
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
		}

		fetchAll()
	})

	let allTours = $derived([...dayTours, ...highlandTours])
</script>

{#if loading}
	<BaseLoading />
{:else}
	<HomeHero />
	<HomeFeaturedSlider tours={allTours} />
	<HomeDayTours tours={dayTours} />
	<HomeHighlandTours tours={highlandTours} />
	<HomeContact
		{data}
		{allTours} />
{/if}
