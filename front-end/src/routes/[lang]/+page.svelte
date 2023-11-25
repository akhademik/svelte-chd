<script lang="ts">
	import { BaseSeo } from '$base'
	import { HomePage } from '$modules/home-page'
	import { seo } from '$utils/seo-info'
</script>

<BaseSeo
	title="CHD Travel - 2023"
	description={seo.description}
	keywords={seo.keywords} />
<HomePage />
