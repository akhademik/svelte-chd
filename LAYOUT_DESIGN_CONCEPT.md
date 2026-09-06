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
  - `Page Header / Route Title (H1/H2 Section)`: `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-moss tracking-tight leading-tight` (Dùng màu **`text-moss`** (`#5F6E56`) và **`font-bold`** để tạo điểm nhấn nổi bật trên nền sand).
  - `Content H1`: `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-moss tracking-tight leading-tight`
  - `Content H2`: `font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss` hoặc `font-normal text-stone-900`
  - `Content H3`: `font-serif text-xl sm:text-2xl font-normal text-stone-900`
  - `Overline / Step marker`: `text-xs font-medium uppercase tracking-[0.25em] text-stone-400` hoặc `text-terracotta`
- **Body & Controls**: `font-sans` (`"Plus Jakarta Sans"`, `sans-serif`)
  - `Body Text`: `text-sm sm:text-base font-light leading-relaxed text-stone-600`
  - `Tour Details Content`: `text-sm sm:text-base font-light leading-relaxed text-stone-700` (đảm bảo độ rõ nét, dễ đọc)
  - `Button / CTA Label`: `text-xs uppercase tracking-widest font-semibold`
- **Quy chuẩn Chữ Đa ngôn ngữ (Casing Convention)**:
  - **Toàn bộ Page Header Route / Navbar Labels** (`day tours`, `highland tours`, `about us`, `contact us`, `blog`...): **BẮT BUỘC dùng 100% lowercase** trên tất cả các ngôn ngữ (VN, EN, FR). Ví dụ FR dùng `excursion d'une journée`, `excursions en montagne` thay vì Title case.

---

## 4. Kiến trúc Layout & Container (Grid & Spacing)

- **Wrapper chuẩn (Mobile-first Padding)**:
  - Tất cả các trang (`day-tours`, `highland-tours`, `contact`, `about`, `blog`...): **BẮT BUỘC dùng `mx-auto max-w-6xl px-6 py-12`** (hoặc `py-16 sm:py-24`).
  - Tuyệt đối không dùng padding chỉ riêng cho desktop (ví dụ `lg:px-11` mà thiếu `px-6` cho mobile) khiến nội dung, form input hoặc iframe bản đồ dính sát mép màn hình.
  - Mọi chỉnh sửa UI đều phải xem xét và kiểm tra trước trên **Mobile View**.
- **Section Padding**: `py-16 sm:py-24` (hoặc `py-12` đối với các trang route phụ).
- **Phần xen kẽ (Alt Section)**: Xen kẽ giữa nền `bg-sand` và nền `bg-sand-alt` (`#C7BB98`) để phân tách trực quan.
- **Card Styling**:
  - Viền mỏng: `border border-stone-200/90 bg-sand-card` (tránh dùng `bg-white` gắt chói).
  - Radius: Bo nhẹ góc tối thiểu (`rounded-none` hoặc `rounded-sm`) để giữ phong cách tạp chí cổ điển cao cấp.
- **Modal Behavior (Tour Detail / Blog Detail / Booking Modal)**:
  - Mobile View (`< sm`): Fullscreen hoàn toàn (`h-full max-h-screen w-full rounded-none border-0`), lớp phủ đặt `z-[60]` để đè lên trên Navbar và Mobile menu (`z-40`).
  - Desktop View (`sm:` trở lên): Pop-up dạng hộp thoại (`sm:h-auto sm:max-h-[90vh] sm:border`).
- **Hero Slider Title Clamping**:
  - Giới hạn tối đa 2 dòng (`line-clamp-2`) kèm `title={title}` tooltip để tránh vỡ layout khi tên tour quá dài. Badge và duration sử dụng `min-h-[1.75rem] flex-wrap gap-2.5` để tự động xuống dòng linh hoạt.

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

### 5.4. Review & Testimonial Cards (Mobile & Desktop)
- **Responsive Sizing**:
  - Desktop View (`sm:` trở lên): Chiều cao cố định `h-[360px] p-8` để tạo sự đồng đều trên lưới 3 cột.
  - Mobile View (`< sm`): Chiều cao linh hoạt `min-h-[220px] p-5` để ôm sát nội dung bài đánh giá, triệt tiêu khoảng trống thừa bên dưới đoạn trích review (`line-clamp-4`).
  - Khoảng cách nội bộ: Header rating `mb-3 sm:mb-4`, Author footer `mt-3 sm:mt-4 pt-3 sm:pt-4`.
- **A11y & Touch Controls**:
  - Hỗ trợ swipe touch mượt mà (`ontouchstart`/`ontouchend` với ngưỡng lướt 40px).
  - Tự động tạm dừng (pause auto-play) khi hover hoặc focus bàn phím.
  - Hỗ trợ `prefers-reduced-motion: reduce`.

### 5.5. Touch Targets (Mobile Usability)
- **Chuẩn kích thước vùng chạm tối thiểu (Tap Target Size)**:
  - Tất cả các nút tương tác (Burger menu button, Locale switcher links, Social buttons, Carousel next/prev) phải đạt kích thước tối thiểu `44x44px` (hoặc min-height 36px) để tránh bấm nhầm trên màn hình cảm ứng di động.

### 5.6. Floating Controls (Scroll to Top)
- **Floating Scroll-To-Top Button**:
  - Xuất hiện tự động khi cuộn qua màn hình đầu tiên (`scrollY > innerHeight * 0.75`).
  - Nút tròn/vuông mộc mạc viền mỏng: `fixed bottom-6 right-6 z-30 h-11 w-11 bg-sand-card/90 border border-stone-300 backdrop-blur-sm hover:bg-moss hover:text-white transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-moss`.
  - Hỗ trợ trợ năng `aria-label="Scroll to top of page"` và hiệu ứng nhẹ `fly={{ y: 16, duration: 250 }}`.

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
5. **Section Spacing & Proportions**:
   - Trang chủ (`home-page`): Giữ padding section đồng bộ `py-14 sm:py-18` (Why CHD, Day Tours, Highland Tours, Testimonials, Featured Blogs).
   - Component CTA Plan Your Trip: Thu gọn `py-12 sm:py-16`, tiêu đề `text-2xl sm:text-4xl`, nội dung `max-w-3xl` tạo điểm kết trang nhã, không choán hết tầm nhìn.
