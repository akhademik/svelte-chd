<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import type { Translation } from '$i18n/i18n-types'

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

	let chosen_tags = $state<Trans_Key[]>([])
	const change = (tag: Trans_Key) => {
		const index = chosen_tags.indexOf(tag)
		if (index > -1) {
			chosen_tags = chosen_tags.filter(t => t !== tag)
		} else {
			chosen_tags = [...chosen_tags, tag]
		}
	}
</script>

<section class="flex flex-wrap gap-2">
	{#each tags as { name } (name)}
		{@const checked = chosen_tags.includes(name)}
		<label
			class={`relative cursor-pointer border px-3 py-1.5 text-xs transition-all ${
				checked
					? 'border-stone-900 bg-stone-900 text-stone-50'
					: 'border-stone-300 bg-stone-50 text-stone-700 hover:border-stone-900'
			}`}>
			{$LL.contact_page.tags[name]()}
			<input
				value={name}
				name="selected_tag"
				type="checkbox"
				onchange={() => change(name)}
				class="invisible absolute" />
		</label>
	{/each}
</section>
