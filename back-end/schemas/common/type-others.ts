export const content_block = {
  title: 'Content Block',
  name: 'content_block',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {
          title: 'Normal',
          value: 'normal',
        },
        {
          title: 'Title',
          value: 'h4',
        },
        {
          title: 'Notice',
          value: 'h5',
        },
        {
          title: 'Quote',
          value: 'blockquote',
        },
      ],
      marks: {
        decorators: [
          {
            title: 'Bold',
            value: 'strong',
          },
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Underline',
            value: 'underline',
          },
        ],
      },
    },
    {
      type: 'image',
      option: {
        hotspot: true,
      },
    },
  ],
}
