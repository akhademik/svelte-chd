<script lang="ts">
	export let text: string
</script>

<span
	class="font-roboto before:bg-secondary after:bg-secondary relative z-20 mt-1 inline-block overflow-hidden px-[1px] pb-1 pt-[1px] before:absolute before:bottom-0 before:left-0 before:block before:h-[2px] before:w-full before:transition before:duration-[800ms] after:absolute after:-left-[180%] after:bottom-0 after:block after:h-[2px] after:w-full after:transition after:duration-[800ms] hover:before:translate-x-[180%] hover:after:translate-x-[180%]">
	{text}
</span>
