import {GiLightBulb} from 'react-icons/gi'

export default {
  title: 'Thông Tin Cần Biết (Good to Know)',
  name: 'tourGoodToKnow',
  icon: GiLightBulb,
  type: 'document',
  fields: [
    {
      title: 'Phân loại nhóm (Category)',
      name: 'category',
      type: 'string',
      hidden: true,
      readOnly: true,
      options: {
        list: [
          {
            title: 'Mức độ vận động',
            value: 'activity_level',
          },
          {
            title: 'Hành trang',
            value: 'what_to_pack',
          },
          {
            title: 'Quy mô nhóm',
            value: 'group_size',
          },
          {
            title: 'Lưu ý khác',
            value: 'other_notes',
          },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Tiêu đề mục',
      name: 'title',
      type: 'locale_string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Nội dung chi tiết',
      name: 'description',
      type: 'locale_string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      titleVi: 'title.vi',
      titleEn: 'title.en',
      category: 'category',
    },
    prepare(selection: any) {
      const {titleVi, titleEn, category} = selection
      const categoryLabels: Record<string, string> = {
        activity_level: 'Mức độ vận động',
        what_to_pack: 'Hành trang',
        group_size: 'Quy mô nhóm',
        other_notes: 'Lưu ý khác',
      }
      return {
        title: titleVi || titleEn || 'Chưa đặt tiêu đề',
        subtitle: categoryLabels[category] || category || 'Chưa phân loại',
      }
    },
  },
}
