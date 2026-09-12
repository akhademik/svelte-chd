import {HiOutlinePhotograph} from 'react-icons/hi'

export default {
  name: 'heroImage',
  title: 'Hình Nền Hero',
  type: 'document',
  icon: HiOutlinePhotograph,
  fields: [
    {
      name: 'title',
      title: 'Tên / Chú thích ảnh',
      type: 'string',
      description: 'Gợi nhớ vị trí cảnh quan (vd: Đồi thông Măng Đen, Biển Hồ Pleiku)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Hình ảnh nền (High Resolution)',
      type: 'image',
      description: 'Nên dùng ảnh ngang tỉ lệ 16:9 hoặc ảnh độ phân giải cao (tối thiểu 1600px)',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isSticky',
      title: 'Ghim cố định (Sticky)',
      type: 'boolean',
      description:
        'Nếu BẬT (ON), website sẽ luôn chọn hiển thị duy nhất hình ảnh này trên Hero. Chỉ được bật sticky cho 1 ảnh duy nhất trong danh sách.',
      initialValue: false,
      validation: (Rule: any) =>
        Rule.custom(async (isSticky: boolean | undefined, context: any) => {
          if (!isSticky) return true

          const {document, getClient} = context
          const client = getClient({apiVersion: '2023-01-01'})
          // Query other documents of type heroImage that have isSticky == true
          const id = document?._id ? document._id.replace(/^drafts\./, '') : ''
          const count = await client.fetch(
            `count(*[_type == 'heroImage' && isSticky == true && !(_id in [$id, "drafts." + $id])])`,
            {id},
          )

          if (count > 0) {
            return 'Đã có 1 hình ảnh khác đang được đặt Sticky. Hãy tắt sticky ở hình đó trước hoặc chỉ cho phép duy nhất 1 hình sticky.'
          }

          return true
        }),
    },
    {
      name: 'isActive',
      title: 'Kích hoạt sử dụng',
      type: 'boolean',
      description: 'Tắt mục này nếu bạn tạm thời không muốn ảnh này xoay vòng xuất hiện.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      isSticky: 'isSticky',
      isActive: 'isActive',
      media: 'image',
    },
    prepare(selection: any) {
      const {title, isSticky, isActive, media} = selection
      const statusParts: string[] = []
      if (isSticky) statusParts.push('⭐ STICKY (Cố định)')
      if (isActive === false) statusParts.push('⛔ Tạm ẩn')
      if (statusParts.length === 0) statusParts.push('🔄 Tự động xoay vòng')

      return {
        title: title || 'Hero Image',
        subtitle: statusParts.join(' | '),
        media,
      }
    },
  },
}
