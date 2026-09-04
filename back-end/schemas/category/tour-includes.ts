import {GiChecklist} from 'react-icons/gi'

export default {
  title: 'Các Hạng Mục Bao Gồm',
  name: 'tourIncludes',
  icon: GiChecklist,
  type: 'document',
  fields: [
    {
      title: 'Tour Type',
      name: 'tourType',
      type: 'string',
    },
    {
      title: 'Tour Inclusions',
      name: 'tourIncludes',
      type: 'array',
      of: [
        {
          type: 'locale_string',
        },
        {
          type: 'localeString',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'tourType',
      items: 'tourIncludes',
    },
    prepare(selection: any) {
      const {title, items} = selection
      return {
        title,
        subtitle: `Bao gồm ${items?.length || 0} mục `,
      }
    },
  },
}
