<script lang="ts">
	import { seo_description, seo_keywords, seo_title } from '$stores/seo-store'

	const base = {
		desc: 'Discover the vibrant culture and rich traditions of Vietnam’s highlands with our travel agency. Experience the lifestyle of the minority people, participate in their customs, and explore breathtaking landscapes. Join us for sustainable and responsible tourism',
		keys: 'Vietnam Travel Agency, Highlands Tour, Minority People Lifestyle, Cultural Immersion, Traditional Ceremonies, Sustainable Tourism, Responsible Tourism, Scenic Hikes, Ethnic Minorities, Local Folklore, Breathtaking Landscapes, Vietnam Highlands, Rural Life Experience',
	}
</script>

<svelte:head>
	<title>{$seo_title}</title>
	<meta
		name="description"
		content={base.desc + ' ' + $seo_description} />

	<meta
		name="keywords"
		content={base.keys + ' ' + $seo_keywords} />

	<meta
		property="og:title"
		content={$seo_title} />
	<meta
		property="og:description"
		content={base.desc + ' ' + $seo_description} />
</svelte:head>
