<script lang="ts">
	import '$assets/styles/main.css'
	import '$assets/styles/tailwind.css'

	import { BaseBookingModal, BaseFooter, BaseSeo, BaseTourDetailModal } from '$base'
	import { setLocale } from '$i18n/i18n-svelte'
	import { MobileMenu } from '$modules/mobile-menu'
	import { NavBar } from '$modules/nav-bar'
	import { Toaster } from 'svelte-french-toast'

	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()
	$effect(() => {
		if (data?.locale) {
			setLocale(data.locale)
		}
	})
</script>

<Toaster />
<BaseSeo />
<NavBar />
<MobileMenu />

<main class="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-stone-200">
	{#if children}
		{@render children()}
	{/if}
</main>

<BaseFooter />
<BaseBookingModal />
<BaseTourDetailModal />
