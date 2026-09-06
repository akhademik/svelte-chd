# CHD Travel — Sanity Content Studio (Backend)

Hệ thống quản trị nội dung (CMS) theo thời gian thực (real-time Content Studio) được xây dựng trên nền tảng **Sanity.io v3** phục vụ toàn bộ dữ liệu cho ứng dụng du lịch **CHD Travel**.

---

## 📌 Các Tính Năng & Schema Chính

- **Tours Management (`day-tours` / `highland-tours`)**:
  - Quản lý danh sách tour trong ngày và tour dài ngày Tây Nguyên.
  - Hỗ trợ nhập liệu đa ngôn ngữ (`tour_name`, `tour_duration`, `tour_intro`, `tour_itinerary` cho tiếng Việt `vn`, tiếng Anh `en`, tiếng Pháp `fr`).
  - Phân loại thẻ `#tags`, điểm nổi bật (`highlights`), dịch vụ bao gồm (`includes`), bảng giá phân theo số lượng khách (`tour_price`: pax 1, pax 2, pax 3,...), và đánh dấu tour bán chạy (`best_sell`).
  - Album hình ảnh chất lượng cao và ảnh bìa (`img_cover`, `img_tour`).
- **CHD Journal / Blog (`blogPost`)**:
  - Quản lý bài viết trải nghiệm, sự kiện, điểm đến, câu chuyện lữ hành.
  - Hỗ trợ trình soạn thảo văn bản phong phú `PortableText` với nhúng ảnh kèm chú thích.
- **Tỷ Giá Ngoại Tệ (`exchangeRates`)**:
  - Cập nhật tỷ giá hối đoái USD, EUR phục vụ hiển thị giá tour linh hoạt theo tiền tệ địa phương và quốc tế.

---

## 🚀 Hướng Dẫn Cài Đặt & Phát Triển

### 1. Cài đặt Dependencies
```bash
# Chạy từ thư mục gốc dự án
pnpm install
```

### 2. Chạy Content Studio ở môi trường Local
```bash
# Chạy trực tiếp từ root
pnpm dev:back-end

# Hoặc chạy trong thư mục back-end
cd back-end && pnpm dev
```
Studio sẽ khởi chạy tại: `http://localhost:3333`

### 3. Kiểm tra mã nguồn (Quality Gate)
```bash
pnpm check:all
pnpm lint:all
```

