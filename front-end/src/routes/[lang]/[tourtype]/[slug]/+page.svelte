<script lang="ts">
	import { page } from '$app/stores'
	import { set_seo } from '$lib/stores/seo-store'
	import { onMount } from 'svelte'

	onMount(() => {
		set_seo($page.params.slug)
		return () => set_seo('default')
	})
</script>

<h1>slug page {$page.params.slug}</h1>
