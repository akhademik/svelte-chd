<script lang="ts">
	import LL from '$i18n/i18n-svelte'

	$: console.log($LL)
</script>

<h1>Test Page</h1>
<h1>Locale: {$LL.HI()}</h1>
