<script lang="ts">
	import type { BlogPost } from '$lib/types/blog.type'
	import type { Tour } from '$lib/types/tour.type'
	import HomeFeaturedBlogs from './components/home-featured-blogs.svelte'
	import HomeFeaturedSlider from './components/home-featured-slider.svelte'
	import HomeHero from './components/home-hero.svelte'
	import HomePlanYourTrip from './components/home-plan-your-trip.svelte'
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
	let activeHeroImage = $derived(data?.activeHeroImage)
	let allHeroImages = $derived(data?.allHeroImages || [])
</script>

<HomeHero
	heroImage={activeHeroImage}
	heroImages={allHeroImages} />
<HomeWhyChd />
<HomeFeaturedSlider tours={allTours} />
<HomeTestimonials {testimonials} />
<HomeFeaturedBlogs posts={featuredPosts} />
<HomePlanYourTrip />
