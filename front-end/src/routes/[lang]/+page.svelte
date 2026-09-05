<script lang="ts">
	import { HomePage } from '$modules/home-page'
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()
</script>

<HomePage {data} />
