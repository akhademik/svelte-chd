import {gen_price_range} from '../helper-functions'
import {PRICE_RANGE} from './constants'

export const tour_highlights_ref = {
  name: 'tour_highlights',
  title: 'Các điểm chính trong tour',
  type: 'array',
  validation: (Rule: {required: () => any}) => Rule.required(),
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'tour_highlights',
        },
      ],
    },
  ],
}

export const tour_tags_ref = {
  name: 'tour_tags',
  title: 'Tour Tags',
  type: 'array',
  validation: (Rule: {required: () => any}) => Rule.required(),
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'tour_tags',
        },
      ],
    },
  ],
}

export const tour_includes_ref = {
  name: 'tour_includes',
  title: 'Tour bao gồm',
  type: 'reference',
  validation: (Rule: {required: () => any}) => Rule.required(),
  to: [
    {
      type: 'tour_includes',
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
  name: 'tour_slug',
  type: 'slug',
  options: {
    source: `tour_name.en`,
    maxLength: 96,
  },
}
