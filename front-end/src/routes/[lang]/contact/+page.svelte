<script lang="ts">
	import { BaseSeo } from '$base'
	import { ContactPage } from '$modules/contact-page'
	import { seo } from '$utils/seo-info'

	import type { PageData } from './$types'

	export let data: PageData
</script>

<BaseSeo
	title="CHD Travel - Contact Us"
	description={seo.description}
	keywords={seo.keywords} />
<ContactPage {data} />
