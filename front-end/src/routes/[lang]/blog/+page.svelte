<script lang="ts">
	import { page } from '$app/state'
	import LL from '$i18n/i18n-svelte'
	import { BlogPage } from '$modules/blog-page'
	import { setSeo } from '$stores/seo-store'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	$effect(() => {
		const _ = page.url.pathname
		setSeo($LL.seo.blog())
	})
</script>

<BlogPage posts={data?.posts || []} />
