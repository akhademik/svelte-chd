# Hướng dẫn 1 — Rà soát & sửa logic Exchange Rate

## 1. Luồng hiện tại (đã kiểm tra, chạy đúng nhưng còn thô)

```
Sanity (admin nhập tay rates.rateUSD / rates.rateEUR, dạng VND-trên-1-ngoại-tệ, vd 26035)
  -> fetchLatestExchangeRates() invert: USD = 1/rateUSD, EUR = 1/rateEUR
  -> cache 1h (in-memory Map)
  -> +layout.server.ts -> +layout.ts -> +layout.svelte ($effect setRates)
  -> exchange_rates_store
  -> get_exchange_rate('USD'|'EUR') trong utils/sanity.ts
  -> format_price(): final = price_VND * rate
```

Phép toán đúng, nhưng có 4 điểm rủi ro cần sửa trước khi để lâu dài trong production.

## 2. Gộp default-rate về một nguồn duy nhất

Hiện đang hard-code `{ USD: 0.00003841, EUR: 0.00003317 }` ở 3 nơi khác nhau
(`exchange-rates-store.ts`, `sanity-client.ts`, `utils/sanity.ts`). Nếu sau này đổi mặc định,
rất dễ quên sửa hết cả 3 chỗ.

Tạo file dùng chung:

```ts
// front-end/src/lib/constants/exchange-rates.ts
export const DEFAULT_EXCHANGE_RATES = {
  USD: 0.00003841, // ~ 1 / 26,035 VND
  EUR: 0.00003317, // ~ 1 / 30,148 VND
} as const;
```

Rồi import lại ở cả 3 nơi thay vì khai báo riêng:

```ts
// exchange-rates-store.ts
import { DEFAULT_EXCHANGE_RATES } from "$lib/constants/exchange-rates";
const defaultRates: ExchangeRates = { ...DEFAULT_EXCHANGE_RATES };
```

```ts
// server/sanity-client.ts
import { DEFAULT_EXCHANGE_RATES } from "$lib/constants/exchange-rates";
const defaultRates: ExchangeRatesData = { ...DEFAULT_EXCHANGE_RATES };
```

```ts
// utils/sanity.ts
import { DEFAULT_EXCHANGE_RATES } from "$lib/constants/exchange-rates";
export const get_exchange_rate = (rate: string) => {
  const storeRates = exchange_rates_store.getRates();
  if (storeRates?.[rate]) return storeRates[rate];
  return DEFAULT_EXCHANGE_RATES[rate as "USD" | "EUR"] ?? 1;
};
```

## 3. Ghi rõ quy ước nhập liệu ngay trong Sanity Schema

Người nhập liệu (không phải dev) rất dễ hiểu nhầm nên nhập `26035` hay `0.0000384`.
Thêm `description` cho field để tránh nhập sai âm thầm:

```ts
// back-end/schemas/category/exchange-rates.ts
{
  title: 'USD',
  name: 'rateUSD',
  type: 'number',
  description: 'Nhập theo dạng thông thường: 1 USD = bao nhiêu VND (vd: 26035). Hệ thống sẽ tự quy đổi ngược khi hiển thị giá.',
  validation: (Rule: any) => Rule.required().min(15000).max(40000),
},
{
  title: 'EUR',
  name: 'rateEUR',
  type: 'number',
  description: 'Nhập theo dạng thông thường: 1 EUR = bao nhiêu VND (vd: 28500).',
  validation: (Rule: any) => Rule.required().min(20000).max(40000),
},
```

> Khoảng `min/max` chỉ là chặn lỗi gõ nhầm rõ ràng (vd gõ `2.6` hay `260350`), chỉnh lại theo biên độ tỷ giá thực tế bạn muốn cho phép.

## 4. Validate lại phía frontend cho chắc (phòng khi Studio bị bypass qua API)

```ts
// server/sanity-client.ts
export const fetchLatestExchangeRates =
  async (): Promise<ExchangeRatesData> => {
    return cachedFetch("latest-exchange-rates", 60 * 60 * 1000, async () => {
      try {
        const doc = await sanityClient.fetch(
          `*[_type == 'exchangeRates'] | order(exchangeDate desc, _updatedAt desc)[0]{exchangeDate, rates}`,
        );
        const usd = doc?.rates?.rateUSD;
        const eur = doc?.rates?.rateEUR;
        const isValid = (n: number) =>
          typeof n === "number" && n > 1000 && n < 100000;

        if (isValid(usd) && isValid(eur)) {
          return {
            USD: 1 / usd,
            EUR: 1 / eur,
            date: doc.exchangeDate || undefined,
          };
        }
        console.warn(
          "[fetchLatestExchangeRates] rate ngoài khoảng hợp lệ, dùng default:",
          { usd, eur },
        );
        return { ...DEFAULT_EXCHANGE_RATES };
      } catch (err) {
        console.warn("[Sanity Server fetchLatestExchangeRates error]:", err);
        return { ...DEFAULT_EXCHANGE_RATES };
      }
    });
  };
```

## 5. Tự động hóa lấy tỷ giá & Sửa lỗi GitHub Actions Cron Workflow

### 5.1. Kiểm tra ngày (Check date) trước khi gọi API để tiết kiệm Quota
Tránh lãng phí request khi chạy `workflow_dispatch` nhiều lần trong ngày:

```js
const existing = await client.fetch(`*[_id == "exchange-rates-latest"][0]{exchangeDate}`);
const today = new Date().toISOString().split('T')[0];
if (existing?.exchangeDate === today) {
  console.log(`[Sync]: Đã có rate ngày ${today} rồi, bỏ qua, không gọi API ngoài.`);
  return;
}
```

### 5.2. Sửa lỗi `MODULE_NOT_FOUND` của `@sanity/client` trong GitHub Actions
Vì dự án dùng pnpm monorepo (không bật shamefully-hoist lên root), file `.github/workflows/sync-rates.yml` chạy script `node -e` ở thư mục gốc sẽ không tìm thấy `@sanity/client`.

**Cách sửa**:
1. Chạy script từ trong thư mục `front-end` (nơi đã cài `@sanity/client`), hoặc:
2. Thêm script node helper `front-end/scripts/sync-rates.js` và gọi `pnpm --filter ./front-end exec node scripts/sync-rates.js` trong GitHub Action step.

## 6. Checklist test nhanh sau khi sửa

- [x] Nhập `rateUSD = 26035` trong Studio → giá tour hiển thị đúng USD tương ứng.
- [x] Nhập thử `rateUSD = 2.6` (lỗi gõ) → bị validation Sanity chặn, không lưu được.
- [x] Xoá hết document `exchangeRates` → site vẫn chạy, dùng `DEFAULT_EXCHANGE_RATES`, không crash.
- [x] Đổi locale vn/en/fr → giá hiển thị đúng theo từng currency tương ứng.
- [x] Workflow `.github/workflows/sync-rates.yml` chạy thành công không bị lỗi `MODULE_NOT_FOUND` và tự ngắt nếu đã có rate hôm nay.

---

# Hướng dẫn 2 — Tạo Testimonial Document trong Sanity + Fetch ở Frontend

## 0. Nguyên tắc dữ liệu (đọc trước khi làm)

Vì TripAdvisor **không cho crawl tự động** (vi phạm Terms of Use + có anti-bot), document này
được thiết kế để bạn **copy tay** nội dung review tốt vào Sanity Studio (giống cách bạn viết bài
blog), có field `source` để đánh dấu review đến từ đâu, và field `sourceUrl` để dẫn về đúng
review gốc trên TripAdvisor cho minh bạch. Sau này nếu muốn tự động hoàn toàn, đường chính thức
là TripAdvisor Content API (đăng ký ở tripadvisor.com/developers) — lúc đó chỉ cần viết thêm 1
hàm fetch riêng, schema JSON bên dưới không cần đổi.

## 1. Thiết kế field & hỗ trợ schema định dạng mới

| Field            | Kiểu                                        | Ghi chú                                             |
| ---------------- | ------------------------------------------- | --------------------------------------------------- |
| `name`           | string                                      | Tên / username của reviewer                         |
| `country`        | string                                      | Quốc gia/thành phố khách (optional)                 |
| `review_title`   | string                                      | Tiêu đề review                                      |
| `review_content` | text                                        | Nội dung review                                     |
| `date_review`    | date                                        | Ngày viết review                                    |
| `stars`          | number (1-5)                                | Số sao đánh giá                                     |
| `url`            | url                                         | Link xem chi tiết review                            |
| `avatar`         | image                                       | Ảnh đại diện khách (optional)                       |
| `tripType`       | string                                      | Loại hình tour (vd "Coffee Tour", "2 ngày Đắk Lắk") |
| `source`         | string enum                                 | `tripadvisor` \| `google` \| `facebook` \| `manual` |
| `isFeatured`     | boolean                                     | Có hiển thị ở trang chủ / contact không             |
| `order`          | number                                      | Thứ tự hiển thị thủ công                            |

---

# Hướng dẫn 3 — Danh mục công việc từ `job-need-do.md`

## 1. Danh sách hạng mục & Trạng thái hoàn thành

- [x] **Homepage Hero Section**: Đã bỏ nút phụ `'Trò chuyện cùng người bản địa'` / `'Connect with a Local Host'` dẫn link sang `/contact`.
- [x] **Tour Detail Page - Free Consultation**: Đã bỏ `'Tư vấn miễn phí • Trao đổi trực tiếp cùng hướng dẫn viên bản địa'` dưới khối hành động nhanh.
- [x] **Tour Detail Page - Departure**: Đã xoá toàn bộ thông tin `'Điểm khởi hành Buôn Ma Thuột'` (ở cả Trip Facts và Quick Info Box).
- [x] **Tour Detail Page - Language**: Đã bỏ dòng `'Ngôn ngữ VN / EN / FR'` trong chi tiết tour.
- [x] **Mobile Booking Modal**: Đã căn giữa màn hình theo chiều dọc (`items-center justify-center p-4`) trên mobile view thay vì dính đáy.
- [x] **Tour Detail CTA - Plan Trip Modal**: Bấm `'Lên kế hoạch chuyến đi này'` (`plan_trip`) ở cả trên và dưới trang chi tiết tour sẽ mở Popup / Modal đặt tour (`booking_modal.open(title)`) thay vì chuyển hướng sang `/contact`.
- [x] **Centralized Testimonials**: Đã bỏ review hardcode trong `contact-review.svelte`, nạp dữ liệu Testimonials tập trung từ Sanity (kèm fallback 3 review mặc định) cho cả trang chủ và trang liên hệ.
- [x] **Sanity Backend Testimonials**: Cập nhật schema `testimonials.ts` hỗ trợ các trường `name`, `country`, `review_title`, `review_content`, `date_review`, `stars`, `url`.

## 2. Kiểm tra chất lượng (Quality Gates)
- [x] `pnpm format:all` — Toàn bộ định dạng code sạch.
- [x] `pnpm check:all` — TypeScript check: 0 errors, 0 warnings (cả front-end & back-end).
- [x] `pnpm lint:all` — ESLint: 0 errors, 0 warnings.
- [x] `pnpm test:unit` — 15/15 unit tests passed.
- [x] `pnpm test:e2e` — 5/5 Playwright E2E tests passed (không kích hoạt submit form thực tế).
- [x] `graphify update .` — Kiến trúc Knowledge Graph đã được cập nhật đồng bộ.

