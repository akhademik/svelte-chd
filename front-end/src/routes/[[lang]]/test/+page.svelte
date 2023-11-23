<script lang="ts">
	import { BaseLocaleSwitcher } from '$base'
	import LL from '$i18n/i18n-svelte'
</script>

<h1>Test Page</h1>
<h1>Locale: {$LL.home_page.intro()}</h1>
<BaseLocaleSwitcher />
