// ./schemas/category.js
import {AiFillTags} from 'react-icons/ai'
import {generate_field} from '../helper-functions'

export default {
  title: 'Tour Tags',
  name: 'tour_tags',
  type: 'document',
  icon: AiFillTags,
  fields: [generate_field('Tour Tags', 'tour_tags', 'locale_string')],
  preview: {
    select: {
      title: 'tour_tags.vn',
    },
  },
}
