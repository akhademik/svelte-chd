# CHD Travel — Design System & Layout Architecture Concept

Tài liệu này định nghĩa toàn bộ quy chuẩn thiết kế (Design Architecture, Colors, Typography, Component Structure) của dự án **CHD Travel** để đảm bảo tính nhất quán khi mở rộng và xây dựng các trang mới (như About Us, Blog, Tour Details,...).

---

## 1. Triết lý Thiết kế (Design Philosophy)

CHD Travel mang tinh thần du lịch bản địa Tây Nguyên: **mộc mạc, đậm chất đất bazan, tinh tế và sang trọng**.
- **Không gian (Whitespace)**: Rộng rãi, thoáng đãng, phân chia section rành mạch.
- **Cảm giác thị giác (Aesthetic)**: Phong cách editorial/tạp chí kết hợp tối giản đương đại.
- **Slogan & Tinh thần**: *"Go local — See local — Eat local"*.

---

## 2. Bảng Màu Chuẩn (Color Palette & Tokens)

| Token Key | HEX Code | Tailwind Class | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Paper / Canvas** | `#FAF9F6` | `bg-stone-50` | Màu nền chính của toàn trang |
| **Paper Alt / Card Muted** | `#F5F4F0` | `bg-stone-100` | Section xen kẽ (alt sections), nền input |
| **Border / Divider** | `#E7E5E0` | `border-stone-200` | Viền card, divider, đường line phân cách |
| **Border Soft** | `#D5D2CA` | `border-stone-300` | Viền interactive elements khi hover |
| **Ink / Primary Text** | `#191918` | `text-stone-900` | Tiêu đề chính (Heading H1-H3), CTA chính |
| **Ink Soft / Body Text** | `#5B5045` / `text-stone-600` | `text-stone-600` | Nội dung mô tả (Body text), phụ đề |
| **Forest / Green Accent** | `#2D3E35` | `bg-forest`, `text-forest` | Màu nhận diện rừng Tây Nguyên, CTA thay thế |
| **Forest Deep** | `#1E3129` | `bg-forest-hover` | Nền hero banner đậm, footer band |
| **Terracotta / Clay** | `#A65B44` | `text-terracotta`, `bg-terracotta` | Điểm nhấn đất đỏ bazan, tag cảm nhận, badge |
| **Gold / Ochre** | `#B8862E` | `text-amber-700`, `bg-amber-600` | Badge sự kiện, mốc timeline, highlight |
| **Teal** | `#3D6E7C` | `text-cyan-800`, `bg-cyan-800` | Tag điểm đến, tour thiên nhiên |

---

## 3. Typography (Kiểu chữ & Font)

- **Headings (Tiêu đề)**: `font-serif` (`"Playfair Display"`, `serif` hoặc `"Fraunces"`)
  - `H1`: `font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight`
  - `H2`: `font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900`
  - `H3`: `font-serif text-xl sm:text-2xl text-stone-900`
  - `Overline / Step marker`: `text-xs font-medium uppercase tracking-[0.25em] text-stone-400`
- **Body & Controls**: `font-sans` (`"Plus Jakarta Sans"`, `sans-serif`)
  - `Body Text`: `text-sm sm:text-base font-light leading-relaxed text-stone-600`
  - `Button / CTA Label`: `text-xs uppercase tracking-widest font-medium`

---

## 4. Kiến trúc Layout & Container (Grid & Spacing)

- **Wrapper chuẩn**: `mx-auto max-w-6xl px-6` (hoặc `lg:px-11`).
- **Section Padding**: `py-16 sm:py-24`.
- **Phần xen kẽ (Alt Section)**: Xen kẽ giữa nền trắng / `bg-stone-50` và nền `bg-stone-100` để phân tách trực quan.
- **Card Styling**:
  - Viền mỏng sắc nét: `border border-stone-200/90 bg-white`
  - Radius: Bo nhẹ góc tối thiểu (`rounded-none` hoặc `rounded-sm`) để giữ phong cách tạp chí cổ điển cao cấp.

---

## 5. Quy chuẩn Component Mẫu (UI Component Conventions)

### 5.1. Nút bấm (Buttons & CTAs)
- **Primary CTA**:
  ```html
  <button class="bg-stone-900 text-stone-50 hover:bg-stone-800 px-6 py-3 text-xs uppercase tracking-widest transition-colors disabled:opacity-50">
    Đặt tour ngay
  </button>
  ```
- **Terracotta CTA (Accent)**:
  ```html
  <button class="bg-[#A65B44] text-white hover:bg-[#8e4c38] px-6 py-3 text-xs uppercase tracking-widest transition-colors">
    Xem chi tiết
  </button>
  ```
- **Outline / Ghost Button**:
  ```html
  <button class="border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors">
    Tìm hiểu thêm
  </button>
  ```

### 5.2. Category Filter Pills (Ví dụ ở Blog, Danh sách Tour)
```html
<button class="px-4 py-2 rounded-full text-xs font-medium transition-colors {active ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400'}">
  Sự kiện sắp diễn ra
</button>
```

### 5.3. Badges & Tags
- Event Tag: `bg-amber-100 text-amber-900 border border-amber-300`
- Story / Feeling Tag: `bg-orange-100 text-orange-900 border border-orange-300`
- Destination Tag: `bg-emerald-100 text-emerald-900 border border-emerald-300`

---

## 6. Cấu trúc Thư mục & Tiêu chuẩn Đa ngôn ngữ (i18n & Svelte 5)

1. **Routes Structure**: `front-end/src/routes/[lang]/<feature>/+page.svelte`
2. **Feature Modules**: `front-end/src/lib/modules/<feature>/`
   - Chứa `index.ts` export component chính và các sub-components trong thư mục `components/`.
3. **i18n Translation Files**:
   - `front-end/src/i18n/vn/t-<feature>.ts`
   - `front-end/src/i18n/en/t-<feature>.ts`
   - `front-end/src/i18n/fr/t-<feature>.ts`
   - Đăng ký vào `index.ts` và chạy `pnpm --filter chd-travel-2023 typesafe-i18n`.
4. **Svelte 5 Runes**:
   - Dùng `$props()`, `$state()`, `$derived()`, `$effect()`.
   - Đối với biến form từ superForm, đặt `// svelte-ignore state_referenced_locally` khi cần thiết.
