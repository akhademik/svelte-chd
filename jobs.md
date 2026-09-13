## ✅ Đã hoàn thành (Completed)

1. **Tour Detail Price Stepper & Pricing Table Highlight**:
   - Thêm bộ điều khiển tăng giảm số khách: `"Số khách - {number} +"`.
   - Tính toán và hiển thị trực tiếp `Đơn giá` và `Tổng tiền` (`unitPrice * guestCount`) tương ứng theo từng bậc khách (`pax1`, `pax2`, `pax3_4`, `pax5_6`, `pax7_9`, `pax10_up`).
   - Tự động highlight khung giá tương ứng trên bảng giá tour khi thay đổi stepper.
   - Đồng bộ hoàn chỉnh cả trên trang chi tiết tour (`tour-details.svelte`) và modal chi tiết tour (`base-tour-detail-modal.svelte`).

2. **Backend "Liên hệ để biết giá" (Contact for Price)**:
   - Thêm toggle `contactForPrice` vào schema Sanity Studio (`tourDaily`, `tourCentral`).
   - Ẩn khung giá trong Sanity Studio khi bật toggle này.
   - Trên giao diện người dùng (Tour Details, Tour Modal, Tour Card, Home Featured Slider): nếu bật `contactForPrice` (hoặc tour chưa có giá), ẩn bảng giá và stepper, hiển thị thông báo & CTA *"Vui lòng liên hệ để được báo giá"* với hỗ trợ đa ngôn ngữ (VI, EN, FR).

3. **Tour Details Top Section Alignment & Svelte Inspector**:
   - Tinh chỉnh Section 3 (Tour Title & Started Price Box) trong `tour-details.svelte` giữ nguyên 1 card thống nhất nhưng căn lề thẳng hàng 100% với widget Stepper của sidebar bên dưới qua `lg:w-[calc((100%/3)-48px)]` và `lg:p-6`.
   - Bọc toàn vẹn header giá và hai nút CTA trong wrapper viền nổi bật.
   - Cấu hình Svelte Inspector hỗ trợ `control-shift` và nút toggle trực quan hỗ trợ debug mã nguồn nhanh.
