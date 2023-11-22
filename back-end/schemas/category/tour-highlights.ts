import {GiStarKey} from 'react-icons/gi'

export default {
  title: 'Các Điểm Nổi Bật',
  name: 'tour_highlights',
  icon: GiStarKey,
  type: 'document',
  fields: [
    {
      title: 'Các điểm chính trong tour',
      name: 'tour_highlights',
      type: 'locale_string',
    },
  ],
  preview: {
    select: {
      title: `tour_highlights.vn`,
    },
  },
}
