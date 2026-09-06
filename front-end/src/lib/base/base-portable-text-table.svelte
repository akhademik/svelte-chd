<script lang="ts">
	interface Props {
		portableText: {
			value: {
				rows?: Array<{
					_key?: string
					cells?: string[]
				}>
			}
		}
	}

	let { portableText }: Props = $props()
	let rows = $derived(portableText?.value?.rows || [])
</script>

{#if rows.length > 0}
	<div class="my-6 w-full overflow-x-auto">
		<table
			class="min-w-full border-collapse border border-border text-left text-sm text-foreground">
			<tbody>
				{#each rows as row, rowIdx}
					<tr
						class={rowIdx === 0
							? 'bg-surface-muted/60 font-semibold text-foreground'
							: 'border-t border-border hover:bg-surface-muted/20'}>
						{#each row.cells || [] as cell}
							{#if rowIdx === 0}
								<th class="border border-border px-4 py-2.5 font-medium">{cell}</th>
							{:else}
								<td class="border border-border px-4 py-2">{cell}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
