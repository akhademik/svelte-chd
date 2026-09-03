// ./schemas/category.js
import {AiFillTags} from 'react-icons/ai'
import {generate_field} from '../helper-functions'

export default {
  title: 'Tour Tags',
  name: 'tourTags',
  type: 'document',
  icon: AiFillTags,
  fields: [generate_field('Tour Tags', 'tourTags', 'locale_string')],
  preview: {
    select: {
      title: 'tourTags.vn',
    },
  },
}
