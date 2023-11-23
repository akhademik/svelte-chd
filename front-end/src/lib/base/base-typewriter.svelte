<script lang="ts">
	import Typewriter from 'svelte-typewriter'

	export let text: string
</script>

<Typewriter
	mode="loop"
	interval={60}
	delay={30}
	unwriteInterval={40}
	cursor={false}>
	<p class="h-5 text-center">
		<span class="font-bold uppercase">{text}</span>
	</p>
</Typewriter>
