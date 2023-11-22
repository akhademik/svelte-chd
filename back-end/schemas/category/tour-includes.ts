import {GiChecklist} from 'react-icons/gi'

export default {
  title: 'Các Hạng Mục Bao Gồm',
  name: 'tour_includes',
  icon: GiChecklist,
  type: 'document',
  fields: [
    {
      title: 'Tour Type',
      name: 'tour_type',
      type: 'string',
    },
    {
      title: 'Tour Inclusions',
      name: 'tour_includes',
      type: 'array',
      of: [
        {
          type: 'locale_string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'tour_type',
      items: 'tour_includes',
    },
    prepare(selection: any) {
      const {title, items} = selection
      return {
        title,
        subtitle: `Bao gồm ${items.length} mục `,
      }
    },
  },
}
