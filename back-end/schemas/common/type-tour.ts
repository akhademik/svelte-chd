import {genPriceRange} from '../helper-functions'
import {PRICE_RANGE} from './constants'

export const tour_level_field = {
  name: 'tourLevel',
  title: 'Cấp độ tour (Tour Level)',
  type: 'string',
  initialValue: 'easy',
  options: {
    list: [
      {title: 'Dễ (Easy)', value: 'easy'},
      {title: 'Trung bình (Medium)', value: 'medium'},
      {title: 'Thử thách / Khó (Hard)', value: 'hard'},
    ],
    layout: 'radio',
  },
  validation: (Rule: {required: () => any}) => Rule.required(),
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
