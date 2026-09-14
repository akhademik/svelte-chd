import type {Rule} from 'sanity'
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
      name: 'activityLevel',
      title: 'Mức độ vận động',
      description: 'Chọn từ kho danh mục "Mức độ vận động"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "activity_level"',
      },
    },
    {
      name: 'whatToPack',
      title: 'Hành trang',
      description: 'Chọn từ kho danh mục "Hành trang"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "what_to_pack"',
      },
    },
    {
      name: 'groupSize',
      title: 'Quy mô nhóm',
      description: 'Chọn từ kho danh mục "Quy mô nhóm"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "group_size"',
      },
    },
    {
      name: 'otherNotes',
      title: 'Lưu ý khác',
      description: 'Chọn từ kho danh mục "Lưu ý khác"',
      type: 'reference',
      to: [{type: 'tourGoodToKnow'}],
      options: {
        filter: 'category == "other_notes"',
      },
    },
  ],
}

export const tour_highlights_ref = {
  name: 'tourHighlights',
  title: 'Các điểm chính trong tour',
  type: 'array',
  validation: (rule: Rule) => rule.required(),
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

export const tour_includes_ref = {
  name: 'tourIncludes',
  title: 'Tour bao gồm',
  type: 'reference',
  validation: (rule: Rule) => rule.required(),
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
