import {genPriceRange} from '../helper-functions'
import {PRICE_RANGE} from './constants'

export const tour_good_to_know = {
  name: 'goodToKnow',
  title: 'Thông tin cần biết (Tùy chọn)',
  description: 'Chọn các mục thông tin tương ứng cho tour từ 4 danh mục thông tin cần biết',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'activitySeason',
      title: 'Thời điểm & Mức độ vận động (Season & Activity)',
      description: 'Chọn từ kho danh mục "Thời điểm & Mức độ vận động"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "activity_season"',
      },
    },
    {
      name: 'whatToPack',
      title: 'Hành trang & Trang phục khuyến nghị (What to pack)',
      description: 'Chọn từ kho danh mục "Hành trang & Trang phục"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "what_to_pack"',
      },
    },
    {
      name: 'transportGroup',
      title: 'Đón trả & Quy mô nhóm (Pickup & Group size)',
      description: 'Chọn từ kho danh mục "Đón trả & Quy mô nhóm"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "transport_group"',
      },
    },
    {
      name: 'dietNotes',
      title: 'Ăn uống & Các lưu ý khác (Diet & Special notes)',
      description: 'Chọn từ kho danh mục "Ăn uống & Lưu ý khác"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "diet_notes"',
      },
    },
  ],
}

export const tour_highlights_ref = {
  name: 'tourHighlights',
  title: 'Các điểm chính trong tour',
  type: 'array',
  validation: (Rule: {required: () => any}) => Rule.required(),
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'tourHighlights',
        },
      ],
    },
  ],
}

export const tour_tags_ref = {
  name: 'tourTags',
  title: 'Tour Tags',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'tourTags',
        },
      ],
    },
  ],
}

export const tour_includes_ref = {
  name: 'tourIncludes',
  title: 'Tour bao gồm',
  type: 'reference',
  validation: (Rule: {required: () => any}) => Rule.required(),
  to: [
    {
      type: 'tourIncludes',
    },
  ],
}

export const tour_price = {
  title: 'Khung Giá Tour',
  name: 'tour_price',
  type: 'object',
  hidden: ({document}: {document?: any}) => Boolean(document?.contactForPrice),
  validation: (Rule: any) =>
    Rule.custom((value: any, context: any) => {
      if (context?.document?.contactForPrice) return true
      return value ? true : 'Vui lòng nhập khung giá tour'
    }),
  fieldsets: [
    {
      title: 'Dành cho',
      name: 'price_range',
      options: {
        collapsible: false,
      },
    },
  ],
  fields: genPriceRange(PRICE_RANGE),
}

export const exchange_rates_ref = {
  title: 'Tỉ giá quy đổi',
  name: 'exchangeRates',
  type: 'reference',
  to: [
    {
      type: 'exchangeRates',
    },
  ],
  initialValue: {
    _type: 'reference',
    _ref: 'exchange-rates-latest',
  },
  readOnly: true,
}
