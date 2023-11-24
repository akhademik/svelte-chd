<script lang="ts">
	import { ContactPage } from '$modules/contact-page'

	import type { PageData } from './$types'

	export let data: PageData
</script>

<ContactPage {data} />
