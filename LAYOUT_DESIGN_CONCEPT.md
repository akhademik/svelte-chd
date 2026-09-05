# CHD Travel — Design System & Layout Architecture Concept

Tài liệu này định nghĩa toàn bộ quy chuẩn thiết kế (Design Architecture, Colors, Typography, Page Transitions, Component Structure) của dự án **CHD Travel** để đảm bảo tính nhất quán khi mở rộng và xây dựng các trang mới (như About Us, Blog, Tour Details,...).

---

## 1. Triết lý Thiết kế (Design Philosophy)

CHD Travel mang tinh thần du lịch bản địa Tây Nguyên: **mộc mạc, trầm ấm đậm chất đất bazan, tinh tế và dịu mắt (anti-glare/matte)**.
- **Không gian (Whitespace)**: Rộng rãi, thoáng đãng, phân chia section rành mạch.
- **Cảm giác thị giác (Aesthetic)**: Phong cách editorial/tạp chí kết hợp tối giản đương đại, phủ lớp texture/noise 5% tạo chất liệu nhám mộc mạc thay vì phản quang chói mắt.
- **Chuyển cảnh (Transitions)**: Animation chuyển trang mượt mà, đồng bộ trên toàn bộ route (`in:fly={{ y: 16, duration: 400, delay: 100 }}` và `out:fade={{ duration: 150 }}`).
- **Slogan & Tinh thần**: *"Go local — See local — Eat local"*.

---

## 2. Bảng Màu Chuẩn (Color Palette & Tokens)

| Token Key | HEX Code | Tailwind Class | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| **Sand / Nền chính** | `#D6CBAE` | `bg-sand`, `bg-stone-100` | Nền chính toàn trang (ấm, trầm, chống mỏi mắt) |
| **Sand Alt / Nền phụ** | `#C7BB98` | `bg-sand-alt`, `bg-stone-200` | Nền section xen kẽ để tách khối trực quan |
| **Card / Nền thẻ** | `#DFD5B9` | `bg-sand-card`, `bg-stone-50` | Thẻ tour, thẻ blog, form card, review container |
| **Border / Divider** | `rgba(30,28,20,0.2)` / `#C7BB98` | `border-stone-200`, `border-stone-300` | Viền card, divider, đường line phân cách |
| **Ink / Chữ chính** | `#2A2720` | `text-stone-900`, `text-stone-800`, `text-primary` | Tiêu đề chính (Heading H1-H3), chữ chính ấm |
| **Ink Soft / Chữ phụ** | `#5C5646` | `text-stone-500`, `text-stone-600` | Nội dung mô tả (Body text), phụ đề, caption |
| **Charcoal-Olive / Nền tối** | `#2B2A24` | `bg-stone-900`, `bg-stone-950`, `bg-charcoal` | Nền hero slider, dark banners |
| **Moss / Xanh rêu (Accent)** | `#5F6E56` | `bg-moss`, `text-moss`, `bg-accent` | Màu nhận diện rừng rêu Tây Nguyên, nút CTA chính |
| **Moss Dark / Hover** | `#4A5642` | `bg-moss-hover`, `bg-accent-deep` | Trạng thái hover của nút Accent chính |
| **Ochre / Đất nung (Badge/Giá)** | `#A3764A` | `text-ochre`, `bg-ochre`, `text-terracotta`, `bg-terracotta` | Điểm nhấn đất nung, badge "Best Sell", giá tour |
| **Gold / Ochre Highlight** | `#B8862E` | `text-amber-700`, `bg-amber-600` | Badge sự kiện, mốc timeline, highlight |
| **Teal** | `#3D6E7C` | `text-cyan-800`, `bg-cyan-800` | Tag điểm đến, tour thiên nhiên |

---

## 3. Typography (Kiểu chữ & Font)

- **Headings (Tiêu đề)**: `font-serif` / `font-heading` (`"Sora"`, `sans-serif`)
  - `H1`: `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight`
  - `H2`: `font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900`
  - `H3`: `font-serif text-xl sm:text-2xl font-normal text-stone-900`
  - `Overline / Step marker`: `text-xs font-medium uppercase tracking-[0.25em] text-stone-400`
- **Body & Controls**: `font-sans` (`"Plus Jakarta Sans"`, `sans-serif`)
  - `Body Text`: `text-sm sm:text-base font-light leading-relaxed text-stone-600`
  - `Tour Details Content`: `text-sm sm:text-base font-light leading-relaxed text-stone-700` (đảm bảo độ rõ nét, dễ đọc)
  - `Button / CTA Label`: `text-xs uppercase tracking-widest font-semibold`

---

## 4. Kiến trúc Layout & Container (Grid & Spacing)

- **Wrapper chuẩn**: `mx-auto max-w-6xl px-6` (hoặc `lg:px-11`).
- **Section Padding**: `py-16 sm:py-24`.
- **Phần xen kẽ (Alt Section)**: Xen kẽ giữa nền `bg-sand` và nền `bg-sand-alt` (`#C7BB98`) để phân tách trực quan.
- **Card Styling**:
  - Viền mỏng: `border border-stone-200/90 bg-sand-card` (tránh dùng `bg-white` gắt chói).
  - Radius: Bo nhẹ góc tối thiểu (`rounded-none` hoặc `rounded-sm`) để giữ phong cách tạp chí cổ điển cao cấp.

---

## 5. Quy chuẩn Component Mẫu (UI Component Conventions)

### 5.1. Nút bấm (Buttons & CTAs)
- **Primary CTA (Xanh rêu)**:
  ```html
  <a href="#day-tours" class="inline-flex items-center gap-2 bg-moss text-white hover:bg-moss-hover px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all">
    Khám phá các tour
  </a>
  ```
- **Secondary CTA (Outline Ink)**:
  ```html
  <a href="/vn/contact" class="inline-flex items-center border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-sand px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all">
    Liên hệ / Tư vấn
  </a>
  ```

### 5.2. Category Filter Pills (Ví dụ ở Blog, Danh sách Tour)
```html
<button class="px-5 py-2.5 rounded-full text-xs font-medium transition-all {active ? 'bg-stone-900 text-stone-50' : 'border border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-900 hover:text-stone-900'}">
  Tất cả bài viết
</button>
```

### 5.3. Badges & Tags
- Best Sell / Highlight Badge: `bg-terracotta text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider`
- Duration Badge: `bg-stone-900/80 text-stone-100 text-[10px] uppercase tracking-wider`

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
