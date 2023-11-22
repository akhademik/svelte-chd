<script lang="ts">
	import { BaseLocaleSwitcher } from '$base'
	import LL from '$i18n/i18n-svelte'
</script>

<h1>Test Page</h1>
<h1>Locale: {$LL.HI()}</h1>
<BaseLocaleSwitcher />
