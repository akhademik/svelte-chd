export const img_cover = {
  name: 'coverImg',
  title: 'Hình đại diện',
  type: 'image',
  validation: (Rule: {required: () => any}) => Rule.required(),
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Tiêu đề hình',
      validation: (Rule: {required: () => any}) => Rule.required(),
    },
  ],
}
export const img_tour = {
  name: 'imgTour',
  title: 'Hình trong tour',
  type: 'array',
  of: [{type: 'image'}],
}
