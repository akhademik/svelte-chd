import {GiStarKey} from 'react-icons/gi'

export default {
  title: 'Các Điểm Nổi Bật',
  name: 'tourHighlights',
  icon: GiStarKey,
  type: 'document',
  fields: [
    {
      title: 'Các điểm chính trong tour',
      name: 'tourHighlights',
      type: 'locale_string',
    },
  ],
  preview: {
    select: {
      title: 'tourHighlights.vn',
    },
  },
}
