import type { PortableTextComponents } from '@portabletext/svelte'
import BasePortableTextBlock from '$lib/base/base-portable-text-block.svelte'
import BasePortableTextFileAttachment from '$lib/base/base-portable-text-file-attachment.svelte'
import BasePortableTextImage from '$lib/base/base-portable-text-image.svelte'
import BasePortableTextLink from '$lib/base/base-portable-text-link.svelte'
import BasePortableTextList from '$lib/base/base-portable-text-list.svelte'
import BasePortableTextListItem from '$lib/base/base-portable-text-list-item.svelte'
import BasePortableTextTable from '$lib/base/base-portable-text-table.svelte'
import BasePortableTextTextColor from '$lib/base/base-portable-text-text-color.svelte'
import BasePortableTextYoutube from '$lib/base/base-portable-text-youtube.svelte'
import BasePortableTextHighlight from '$lib/base/base-portable-text-highlight.svelte'
import BasePortableTextAlign from '$lib/base/base-portable-text-align.svelte'

export const portableTextComponents: PortableTextComponents = {
	types: {
		image: BasePortableTextImage,
		table: BasePortableTextTable,
		youtube: BasePortableTextYoutube,
		fileAttachment: BasePortableTextFileAttachment,
	},
	marks: {
		link: BasePortableTextLink,
		highlight: BasePortableTextHighlight,
		'align-center': BasePortableTextAlign,
		'align-right': BasePortableTextAlign,
		'align-justify': BasePortableTextAlign,
		textColor: BasePortableTextTextColor,
		'color-navy': BasePortableTextTextColor,
		'color-amber': BasePortableTextTextColor,
		'color-red': BasePortableTextTextColor,
		'color-green': BasePortableTextTextColor,
		'color-blue': BasePortableTextTextColor,
		'color-purple': BasePortableTextTextColor,
		'color-gray': BasePortableTextTextColor,
	},
	block: BasePortableTextBlock,
	list: {
		bullet: BasePortableTextList,
		number: BasePortableTextList,
	},
	listItem: {
		bullet: BasePortableTextListItem,
		number: BasePortableTextListItem,
		normal: BasePortableTextListItem,
	},
}
