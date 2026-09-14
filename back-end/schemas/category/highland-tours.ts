import {GiMountains} from 'react-icons/gi'
import {addThousandSeparator} from '../../components/c-number-input'

import {BASE_FIELDS} from '../common/base-fields'
import {generateField} from '../helper-functions'

export default {
  name: 'tourCentral',
  type: 'document',
  icon: GiMountains,
  title: 'Tour Tây Nguyên',

  fields: [generateField('Mã tour', 'tourID', 'string', 'HL-'), ...BASE_FIELDS],
  preview: {
    select: {
      id: 'tourID',
      img: 'coverImg',
      title: 'tourName.vi',
      isHot: 'bestSellerTour',
      price: 'tourPrice.pax2',
      contactForPrice: 'contactForPrice',
    },
    prepare(selection: any) {
      const {title, isHot, price, id, img, contactForPrice} = selection
      const priceText = contactForPrice
        ? 'Liên hệ để biết giá'
        : `${isHot ? '"Best Sell" từ' : 'Từ'} ${addThousandSeparator(String(price || ''))} vnđ  `
      return {
        media: img,
        title: `${id || ''} - ${title || ''}`,
        subtitle: priceText,
      }
    },
  },
}
