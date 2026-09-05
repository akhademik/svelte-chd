import {FaRegNewspaper} from 'react-icons/fa'
import {generate_field} from '../helper-functions'
import {img_blog, img_cover} from '../common/type-img'

export default {
  name: 'blogPost',
  type: 'document',
  icon: FaRegNewspaper,
  title: 'Bài Viết Blog',
  fields: [
    generate_field('Tiêu đề bài viết', 'title', 'locale_string'),
    {
      title: 'Bài viết nổi bật (Featured)',
      name: 'isFeatured',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Slug bài viết',
      name: 'slug',
      type: 'locale_slug',
    },
    {
      title: 'Chuyên mục / Phân loại',
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Sự kiện sắp diễn ra (Event)', value: 'event'},
          {title: 'Cảm nhận đoàn khách (Story)', value: 'story'},
          {title: 'Kinh nghiệm du lịch (Tips)', value: 'tips'},
          {title: 'Điểm đến Tây Nguyên (Destination)', value: 'destination'},
        ],
        layout: 'radio',
      },
      initialValue: 'story',
    },
    generate_field('Mô tả ngắn (Excerpt)', 'excerpt', 'locale_string'),
    img_cover,
    img_blog,
    generate_field('Nội dung chi tiết', 'content', 'locale_content'),

    {
      title: 'Ngày đăng (Publish Date)',
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      title: 'Tác giả / Người viết',
      name: 'author',
      type: 'string',
      initialValue: 'CHD Travel Team',
    },
  ],
  preview: {
    select: {
      title: 'title.vn',
      subtitle: 'category',
      media: 'coverImg',
    },
    prepare(selection: any) {
      const {title, subtitle, media} = selection
      const categoryMap: Record<string, string> = {
        event: 'Sự kiện',
        story: 'Cảm nhận',
        tips: 'Kinh nghiệm',
        destination: 'Điểm đến',
      }
      return {
        title: title || 'Bài viết chưa đặt tên',
        subtitle: `[${categoryMap[subtitle] || subtitle || 'Blog'}]`,
        media,
      }
    },
  },
}
