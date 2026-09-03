import {GiMountains} from 'react-icons/gi'
import {add_thousand_separator} from '../../components/c-number-input'

import {BASE_FIELDS} from '../common/base-fields'
import {generate_field} from '../helper-functions'

export default {
  name: 'tourCentral',
  type: 'document',
  icon: GiMountains,
  title: 'Tour Tây Nguyên',

  fields: [generate_field('Mã tour', 'tourID', 'string', 'HL-'), ...BASE_FIELDS],
  preview: {
    select: {
      id: 'tourID',
      img: 'coverImg',
      title: `tourName.vn`,
      isHot: 'bestSellerTour',
      price: 'tourPrice.pax2',
    },
    prepare(selection: any) {
      const {title, isHot, price, id, img} = selection
      return {
        media: img,
        title: `${id || ''} - ${title || ''}`,
        subtitle: `${isHot ? '"Best Sell" từ' : 'Từ'} ${add_thousand_separator(String(price || ''))} vnđ  `,
      }
    },
  },
}
