<script lang="ts">
	import type { BlogPost } from '$lib/types/blog.type'
	import type { Tour } from '$lib/types/tour.type'
	import HomeDayTours from './components/home-day-tours.svelte'
	import HomeFeaturedBlogs from './components/home-featured-blogs.svelte'
	import HomeFeaturedSlider from './components/home-featured-slider.svelte'
	import HomeHero from './components/home-hero.svelte'
	import HomeHighlandTours from './components/home-highland-tours.svelte'
	import HomeTestimonials from './components/home-testimonials.svelte'
	import HomeWhyChd from './components/home-why-chd.svelte'

	interface Props {
		data?: {
			dayTours?: Tour[]
			highlandTours?: Tour[]
			featuredPosts?: BlogPost[]
			form?: any
			[key: string]: any
		}
	}

	let { data }: Props = $props()

	let dayTours = $derived(data?.dayTours || [])
	let highlandTours = $derived(data?.highlandTours || [])
	let allTours = $derived([...dayTours, ...highlandTours])
	let featuredPosts = $derived(data?.featuredPosts || [])
	let testimonials = $derived(data?.testimonials || [])
</script>

<HomeHero />
<HomeWhyChd />
<HomeTestimonials {testimonials} />
<HomeFeaturedSlider tours={allTours} />
<HomeDayTours tours={dayTours} />
<HomeHighlandTours tours={highlandTours} />
<HomeFeaturedBlogs posts={featuredPosts} />
