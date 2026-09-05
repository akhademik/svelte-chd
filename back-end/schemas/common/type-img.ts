export const img_cover = {
  name: 'coverImg',
  title: 'Hình đại diện',
  type: 'image',
  validation: (Rule: {required: () => any}) => Rule.required(),
  options: {
    hotspot: true,
  },
}

export const img_tour = {
  name: 'imgTour',
  title: 'Hình trong tour',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}

export const img_blog = {
  name: 'imgTour',
  title: 'Album hình ảnh bài viết',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Chú thích ảnh',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Văn bản thay thế (Alt text)',
        },
      ],
    },
  ],
}
