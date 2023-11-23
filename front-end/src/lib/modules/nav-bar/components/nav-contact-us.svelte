<script lang="ts">
	import { BaseUnderlineText } from '$base'
	import LL, { locale } from '$i18n/i18n-svelte'
	import { nav_deg, nav_mobile } from '$stores/nav-store'

	const click = () => {
		if ($nav_mobile) {
			nav_deg.turn()
			nav_mobile.toggle()
		}
	}
</script>

<a
	class="text-primary text-sm font-bold uppercase"
	href={`/${$locale}/contact`}
	on:click={click}>
	<BaseUnderlineText text={$LL.nav_bar.contact()} />
</a>
