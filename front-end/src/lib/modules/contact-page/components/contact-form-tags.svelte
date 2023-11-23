<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	type Trans_Key = keyof Translation['contact_page']['tags']
	type Tags = {
		name: Trans_Key
	}
	const tags: Tags[] = [
		{ name: 'day_tour' },
		{ name: 'highland_tour' },
		{ name: 'coffee' },
		{ name: 'adventure' },
		{ name: 'trek' },
		{ name: 'ethnic' },
		{ name: 'guide' },
		{ name: 'transport' },
		{ name: 'translate' },
	]

	let chosen_tags: Trans_Key[] = []
	const change = (tag: Trans_Key) => {
		const index = chosen_tags.indexOf(tag)
		index > -1 ? chosen_tags.splice(index, 1) : chosen_tags.push(tag)
		// this to make the chosen_tags array reactive
		chosen_tags = chosen_tags
		dispatch('get-tags', chosen_tags)
	}
</script>

<section class="flex flex-wrap gap-x-3 gap-y-2 pl-3">
	{#each tags as { name } (name)}
		{@const checked = chosen_tags.includes(name) && 'bg-primary text-white'}
		<label
			class={`border-primary relative w-max cursor-pointer select-none border px-3 py-[6px] capitalize ${checked}`}>
			{$LL.contact_page.tags[name]()}
			<input
				{name}
				type="checkbox"
				on:change={() => change(name)}
				class="invisible absolute" />
		</label>
	{/each}
</section>
