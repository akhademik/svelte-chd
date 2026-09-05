import {gen_price_range} from '../helper-functions'
import {PRICE_RANGE} from './constants'

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
  validation: (Rule: {required: () => any}) => Rule.required(),
  fieldsets: [
    {
      title: 'Dành cho',
      name: 'price_range',
      options: {
        collapsible: false,
      },
    },
  ],
  fields: gen_price_range(PRICE_RANGE),
}

export const tour_slug = {
  title: 'Tour Slug',
  name: 'tourSlug',
  type: 'slug',
  options: {
    source: (doc: any) => {
      const nameObj = doc?.tourName || doc?.title
      if (typeof nameObj === 'string') return nameObj
      return nameObj?.vn || nameObj?.en || nameObj?.fr || ''
    },
    maxLength: 96,
  },
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
  readOnly: true,
}
