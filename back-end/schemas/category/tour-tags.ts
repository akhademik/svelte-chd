// ./schemas/category.js
import {AiFillTags} from 'react-icons/ai'
import {generateField} from '../helper-functions'

export default {
  title: 'Tour Tags',
  name: 'tourTags',
  type: 'document',
  icon: AiFillTags,
  fields: [generateField('Tour Tags', 'tourTags', 'locale_string')],
  preview: {
    select: {
      title: 'tourTags.vi',
    },
  },
}
