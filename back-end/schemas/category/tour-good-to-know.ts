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
      options: {
        list: [
          {
            title: '1. Thời điểm & Mức độ vận động (Season & Activity)',
            value: 'activity_season',
          },
          {
            title: '2. Hành trang & Trang phục (What to pack / Attire)',
            value: 'what_to_pack',
          },
          {
            title: '3. Đón trả & Quy mô nhóm (Pickup & Group size)',
            value: 'transport_group',
          },
          {
            title: '4. Ăn uống & Lưu ý khác (Diet & Special notes)',
            value: 'diet_notes',
          },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Biểu tượng Icon (Emoji, vd: 🌤, 🎒, 🚐, 🥗, 👟, ☕, 🌿)',
      name: 'icon',
      type: 'string',
      description: 'Nhập 1 emoji đại diện (tùy chọn, mặc định sẽ dùng icon theo phân loại)',
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
      icon: 'icon',
    },
    prepare(selection: any) {
      const {titleVi, titleEn, category, icon} = selection
      const categoryLabels: Record<string, string> = {
        activity_season: '🌤 Thời điểm & Vận động',
        what_to_pack: '🎒 Hành trang & Trang phục',
        transport_group: '🚐 Đón trả & Quy mô',
        diet_notes: '🥗 Ăn uống & Lưu ý',
      }
      return {
        title: `${icon ? `${icon} ` : ''}${titleVi || titleEn || 'Chưa đặt tiêu đề'}`,
        subtitle: categoryLabels[category] || category || 'Chưa phân loại',
      }
    },
  },
}
