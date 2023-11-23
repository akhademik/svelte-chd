<script lang="ts">
	import { BaseSeo } from '$base'
	import { setLocale } from '$i18n/i18n-svelte'
	import { seo } from '$utils/seo-info'

	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import { MobileMenu } from '$modules/mobile-menu'
	import { NavBar } from '$modules/nav-bar'

	export let data
	setLocale(data.locale)
</script>

<BaseSeo
	title="CHD Travel - 2023"
	description={seo.description}
	keywords={seo.keywords} />

<NavBar />
<MobileMenu />

<slot />
