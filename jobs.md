# TASK: Tối ưu Hero Rotation khi sử dụng Cloudflare CDN Cache

## 1. Mục tiêu

Sửa cơ chế Hero Image Rotation của trang Home để:

1. **Vẫn giữ Cloudflare CDN HTML cache hiện tại**, đặc biệt:
   - `s-maxage=1800`
   - `stale-while-revalidate=3600`
   - `stale-if-error=259200`

2. Hero rotation phải dựa trên **absolute time slot**, không phụ thuộc vào thời điểm HTML được Cloudflare cache.

3. HTML SSR có thể bị stale và `activeHeroImage` trong SSR có thể cũ, nhưng **sau khi client hydrate phải tự xác định Hero Image hiện tại theo thời gian thực**.

4. Tất cả người dùng phải nhìn thấy cùng một Hero Image tại cùng một thời điểm.

5. Không sử dụng `localStorage`, cookie, session hoặc API polling để lưu trạng thái rotation.

6. Không thêm dependency mới.

7. Không phá behavior hiện tại của `isSticky`.

---

# 2. Kiến trúc mong muốn

Luồng dữ liệu phải là:

Sanity
→ HeroImageService
→ Hero Images cache
→ SvelteKit SSR
→ Cloudflare CDN cache
→ Browser
→ Client Hero Rotation Engine
→ `Date.now()` / absolute time slot

Điểm quan trọng:

> Cloudflare chỉ cache HTML/data. Cloudflare KHÔNG được quyết định Hero Image hiện tại.

Hero Image hiện tại phải được tính lại phía client dựa trên absolute timestamp.

---

# 3. Source of Truth

File hiện tại:

`front-end/src/lib/constants/hero.ts`

Đã có:

```ts
calculateHeroSlotIndex(totalImages, targetDate, intervalMs);
```

với logic:

```ts
Math.floor(targetDate.getTime() / effectiveInterval);
```

Hãy tiếp tục sử dụng cơ chế này.

Không tạo một thuật toán rotation khác ở client.

Client và server phải dùng cùng một nguyên tắc:

```text
slot = floor(Date.now() / rotationInterval)
index = slot % totalImages
```

Như vậy:

- 13:00 → cùng một image
- 13:05 → chuyển image
- 13:10 → chuyển image
- user mở trang lúc 13:03 → vào đúng image của slot hiện tại
- user mở trang lúc 13:08 → vào đúng image của slot hiện tại
- HTML Cloudflare được tạo từ 12:55 nhưng user mở lúc 13:07 → client phải tự chuyển sang image đúng slot 13:05.

---

# 4. Không sử dụng LocalStorage

KHÔNG triển khai:

```ts
localStorage;
sessionStorage;
cookie;
```

để lưu:

- current index
- last rotation time
- last image
- next image
- user rotation state

Lý do:

Rotation hiện tại là **global time-based rotation**, không phải user-based rotation.

LocalStorage sẽ tạo thêm một source of truth và có thể khiến các user khác nhau nhìn thấy Hero khác nhau.

---

# 5. Sửa Hero Data Cache

File:

`front-end/src/lib/server/services/hero-image.service.ts`

Hiện tại đang dùng:

```ts
const cacheTtl = getHeroRotationInterval();
```

Điều này đang trộn hai khái niệm:

- Hero data freshness
- Hero rotation interval

Hãy tách chúng ra.

Ví dụ:

```ts
export const HERO_ROTATION_DEV_MS = 5 * 1000
export const HERO_ROTATION_PROD_MS = 5 * 60 * 1000

export const HERO_DATA_CACHE_TTL = ...
```

Có thể chọn TTL phù hợp với kiến trúc cache hiện tại.

Ưu tiên:

- không cần fetch Sanity mỗi 5 phút chỉ vì rotation đổi image
- rotation phải do timestamp quyết định
- cache TTL của Hero data phải độc lập với rotation interval

Không thay đổi TTL tùy tiện nếu repo đã có convention/cache strategy phù hợp. Hãy kiểm tra các cache service hiện tại trước khi quyết định giá trị cuối cùng.

---

# 6. Tránh fetch Hero Images hai lần về mặt logic

File:

`front-end/src/routes/[lang]/+page.server.ts`

Hiện tại đang lấy:

```ts
const [dayTours, highlandTours, featuredPosts, allHeroImages] =
  await Promise.all([...HeroImageService.getHeroImages(kv)]);
```

sau đó lại gọi:

```ts
const activeHeroImage = HeroImageService.getActiveHeroImage
  ? await HeroImageService.getActiveHeroImage(kv)
  : null;
```

Trong đó `getActiveHeroImage()` lại gọi `getHeroImages()`.

Hãy refactor để:

1. Lấy `allHeroImages` một lần.
2. Tính `activeHeroImage` từ chính array đó.

Ví dụ về ý tưởng:

```ts
const allHeroImages = await HeroImageService.getHeroImages(kv);

const activeHeroImage = selectDailyHeroImage(allHeroImages);
```

Có thể giữ API service hiện tại nếu có lý do kiến trúc rõ ràng, nhưng không nên tạo thêm một request/cache lookup không cần thiết.

---

# 7. Giữ nguyên Cloudflare HTML Cache

File:

`front-end/src/routes/[lang]/+page.server.ts`

Giữ:

```ts
setHeaders({
  "cache-control":
    "public, max-age=0, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=259200",
});
```

Không:

- bỏ `s-maxage`
- chuyển thành `no-store`
- cache-bust HTML
- thêm query parameter chống cache
- disable Cloudflare cache

Đây là requirement quan trọng.

---

# 8. Sửa Client Hero Rotation

File:

`front-end/src/lib/modules/home-page/components/home-hero.svelte`

Đây là phần quan trọng nhất.

## Hiện trạng

Component đang:

1. nhận `heroImage` từ SSR
2. dùng `heroImage` để xác định `currentIndex`
3. dùng `setInterval(5 phút)` để tăng index:

```ts
currentIndex = (currentIndex + 1) % effectiveImages.length;
```

Cách này có vấn đề:

- `heroImage` có thể đến từ stale Cloudflare HTML
- browser có thể background tab
- browser có thể bị sleep
- `setInterval()` có thể bị throttle
- sau khi browser wake up, index có thể không còn đúng time slot hiện tại

---

# 9. Không còn coi SSR heroImage là Source of Truth

`heroImage` từ SSR chỉ có vai trò:

> initial SSR / first-paint hint / fallback

Không được dùng để quyết định rotation state lâu dài.

Đặc biệt xem xét và loại bỏ/refactor effect hiện tại:

```ts
$effect(() => {
  if (heroImage) {
    const idx = effectiveImages.findIndex((img) => img._id === heroImage._id);
    if (idx >= 0) {
      currentIndex = idx;
    }
  }
});
```

Effect này có thể ghi đè index mà client vừa tính từ `Date.now()`.

Sau hydration, client phải chuyển sang time-based source of truth.

---

# 10. Client phải tính index từ absolute time

Import:

```ts
calculateHeroSlotIndex;
```

từ:

```ts
$lib / constants / hero;
```

Sau khi component đã hydrate, tính:

```ts
const index = calculateHeroSlotIndex(effectiveImages.length, new Date());
```

và:

```ts
currentIndex = index;
```

Điều này phải xảy ra sau hydration để tránh tạo hydration mismatch không cần thiết.

SSR markup vẫn có thể dùng `heroImage` để render first paint.

Sau hydration:

```text
SSR heroImage
       ↓
first paint
       ↓
hydrate
       ↓
calculateHeroSlotIndex(Date.now())
       ↓
currentIndex
```

---

# 11. Không dùng setInterval cố định 5 phút

Không dùng:

```ts
setInterval(..., rotationInterval)
```

làm cơ chế chính.

Thay vào đó, schedule đến **boundary tiếp theo của time slot**.

Ví dụ:

```ts
const now = Date.now();
const interval = getHeroRotationInterval();

const currentSlot = Math.floor(now / interval);
const nextBoundary = (currentSlot + 1) * interval;

const delay = nextBoundary - now;
```

Sau đó:

```ts
setTimeout(() => {
  syncToClock();
  scheduleNextRotation();
}, delay);
```

Mục tiêu là:

```text
13:04:59
    ↓
13:05:00
    ↓
recalculate Date.now()
    ↓
new slot
    ↓
new image
```

Không đơn giản chỉ:

```ts
currentIndex++;
```

---

# 12. Phải xử lý browser background / sleep

Đây là requirement bắt buộc.

Nếu tab bị background hoặc máy sleep:

```text
13:04
↓
browser sleep
↓
13:17
↓
browser wake
```

Không được chạy tiếp từ:

```text
currentIndex + 1
```

mà phải tính lại:

```ts
calculateHeroSlotIndex(effectiveImages.length, new Date());
```

Như vậy dù browser bị suspend 30 phút, khi quay lại vẫn vào đúng slot hiện tại.

---

# 13. visibilitychange

Nên lắng nghe:

```ts
document.visibilitychange;
```

Khi:

```ts
document.visibilityState === "visible";
```

thì:

1. tính lại current index từ `Date.now()`
2. schedule lại timer tới boundary kế tiếp

Ý tưởng:

```ts
function syncToClock() {
  if (stickyImage || effectiveImages.length <= 1) return;

  currentIndex = calculateHeroSlotIndex(effectiveImages.length, new Date());
}
```

Sau đó:

```ts
function handleVisibilityChange() {
  if (document.visibilityState === "visible") {
    syncToClock();
    scheduleNextRotation();
  }
}
```

Không cần thêm polling.

---

# 14. pageshow

Cân nhắc xử lý thêm:

```ts
window.addEventListener('pageshow', ...)
```

để xử lý trường hợp browser restore page từ BFCache.

Khi page được restore:

```text
pageshow
↓
syncToClock()
↓
scheduleNextRotation()
```

Không cần dependency mới.

---

# 15. Sticky Image phải được ưu tiên tuyệt đối

Behavior hiện tại:

```ts
const stickyImage = heroImages.find((img) => img.isSticky);
```

và:

```ts
if (stickyImage) return [stickyImage];
```

phải được giữ.

Nếu có sticky image:

```text
stickyImage
    ↓
Hero rotation OFF
    ↓
không setTimeout rotation
    ↓
currentIndex = 0
```

Nếu sticky image tồn tại thì không được để time-based rotation thay đổi Hero.

---

# 16. Khi không có sticky

Nếu:

```ts
effectiveImages.length > 1;
```

thì rotation hoạt động.

Index phải được xác định bằng:

```ts
calculateHeroSlotIndex(effectiveImages.length, new Date());
```

Không dựa trên index trước đó.

---

# 17. Khi effectiveImages thay đổi

Cần đảm bảo component vẫn hoạt động nếu:

- Sanity data thay đổi
- heroImages thay đổi
- sticky image xuất hiện/biến mất
- số lượng hero images thay đổi

Khi danh sách thay đổi:

1. kiểm tra sticky
2. nếu sticky → index `0`, rotation off
3. nếu không sticky → tính lại index từ absolute time
4. schedule lại rotation

Không cố giữ index cũ một cách mù quáng.

---

# 18. Hydration safety

Đặc biệt chú ý SvelteKit SSR + hydration.

Không để server render:

```text
Image A
```

nhưng trước khi hydration hoàn thành client đã render:

```text
Image B
```

theo cách gây hydration mismatch.

Có thể giữ:

```ts
let currentIndex = $state(getInitialIndex());
```

cho SSR.

Sau khi client mount/hydrate mới:

```ts
syncToClock();
```

Điều này cho phép:

```text
SSR:
Cloudflare cached Image A

Browser first paint:
Image A

Hydration:
calculate actual slot

Client:
Image B
```

Nếu cần dùng `onMount`, có thể sử dụng API Svelte phù hợp với codebase hiện tại.

Không thêm dependency.

---

# 19. Timer phải cleanup

Khi component destroy:

```ts
clearTimeout(...)
```

và remove:

```ts
visibilitychange;
pageshow;
```

listeners.

Không để timer/listener leak.

---

# 20. Không thay đổi UI/UX không liên quan

Task này chỉ tập trung vào:

- Hero rotation
- cache interaction
- timing
- hydration
- sticky behavior

Không tự ý thay đổi:

- layout
- typography
- button
- animation
- Tailwind classes
- image quality
- Sanity schema
- routing
- i18n
- unrelated components

trừ khi thực sự cần thiết để hoàn thành task.

---

# 21. Expected behavior

## Case 1 — HTML mới

User mở lúc:

```text
13:02
```

Server:

```text
slot = 13:00
```

Hero:

```text
Image A
```

Client hydrate:

```text
slot = 13:00
```

→ vẫn Image A.

---

## Case 2 — Cloudflare HTML stale

Cloudflare đang cache HTML được tạo lúc:

```text
12:57
```

User mở lúc:

```text
13:07
```

SSR HTML:

```text
Image A
```

nhưng actual slot:

```text
13:05
```

Client hydrate:

```text
calculateHeroSlotIndex()
```

→ chuyển sang Image B.

Không cần request API.

Không cần bypass Cloudflare.

Không cần LocalStorage.

---

## Case 3 — Browser sleep

User mở:

```text
13:01
```

Image A.

Laptop sleep.

Wake:

```text
13:21
```

Client không được:

```ts
A → B
```

mà phải tính:

```text
current slot = 13:20
```

→ đúng Image tương ứng slot 13:20.

---

## Case 4 — Tab background

User mở:

```text
13:01
```

Sau đó chuyển sang tab khác 20 phút.

Quay lại:

```text
13:21
```

→ Hero phải lập tức sync về slot 13:20.

---

## Case 5 — Sticky

Sanity:

```ts
isSticky: true;
```

→ luôn hiển thị sticky image.

Không rotation.

---

## Case 6 — Multiple users

User A mở lúc:

```text
13:07
```

User B mở lúc:

```text
13:08
```

Cả hai phải nhìn cùng Hero Image.

Rotation là global, không phải per-user.

---

# 22. Những thứ KHÔNG được làm

Không:

- bỏ Cloudflare cache
- giảm `s-maxage` chỉ để fix rotation
- thêm API polling mỗi 5 phút
- thêm LocalStorage
- thêm cookie
- thêm session
- thêm server-side user state
- thêm dependency
- dùng random image
- dùng `Math.random()`
- dùng client-only random rotation
- cache `activeHeroImage` như một state lâu dài
- dùng `setInterval()` làm source of truth
- chỉ đơn giản `currentIndex++`
- tạo một thuật toán slot khác với `calculateHeroSlotIndex()`

---

# 23. Files dự kiến cần chỉnh

Ưu tiên chỉ chỉnh các file liên quan:

### 1. Constants

```text
front-end/src/lib/constants/hero.ts
```

Mục đích:

- giữ rotation interval
- tách Hero data cache TTL
- dùng chung time-slot calculation
- nếu cần thêm helper cho next boundary

### 2. Hero service

```text
front-end/src/lib/server/services/hero-image.service.ts
```

Mục đích:

- tách data cache TTL khỏi rotation interval
- tránh duplicate logical Hero data fetch

### 3. Home page server

```text
front-end/src/routes/[lang]/+page.server.ts
```

Mục đích:

- lấy Hero list một lần
- derive active hero từ cùng data
- giữ nguyên Cloudflare cache headers

### 4. Hero component

```text
front-end/src/lib/modules/home-page/components/home-hero.svelte
```

Mục đích:

- SSR hero chỉ là initial hint
- client sync theo absolute time
- exact boundary timer
- visibilitychange
- pageshow
- cleanup
- giữ sticky behavior

Không chỉnh file khác nếu không cần.

---

# 24. Testing requirements

Sau khi sửa:

## Static/code checks

Chạy các check hiện có của project.

Không tự ý thêm package chỉ để test.

---

## Manual test

Test ít nhất:

### Test A

Mở page ở giữa slot:

```text
13:02
```

Kiểm tra Hero đúng slot 13:00.

### Test B

Chờ qua:

```text
13:05
```

Kiểm tra Hero đổi.

### Test C

Mở DevTools → Network.

Reload page.

Kiểm tra Cloudflare vẫn có thể serve cached HTML.

Rotation vẫn phải hoạt động.

### Test D

Mở tab.

Đợi hoặc mô phỏng qua nhiều slot.

Background tab.

Quay lại tab.

Hero phải sync đúng slot hiện tại.

### Test E

Sleep/wake hoặc mô phỏng thời gian.

Hero phải recalculate theo `Date.now()`.

### Test F

Bật một `isSticky`.

Hero phải đứng yên.

### Test G

Tắt sticky.

Rotation hoạt động lại.

---

# 25. Logging/debugging

Không thêm logger spam vào production.

Nếu cần debug trong quá trình phát triển, có thể log tối thiểu:

```text
rotation interval
current timestamp
current slot
calculated index
selected hero ID
```

Nhưng phải dùng logger convention hiện tại của project nếu logging thực sự cần.

Không thêm `console.log()` tùy tiện.

---

# 26. Acceptance Criteria

Task chỉ được coi là hoàn thành khi tất cả điều kiện sau đúng:

- [ ] Cloudflare HTML cache 30 phút vẫn được giữ.
- [ ] Không dùng LocalStorage cho Hero rotation.
- [ ] Không dùng cookie/session cho Hero rotation.
- [ ] Không polling API mỗi 5 phút.
- [ ] Client sử dụng cùng `calculateHeroSlotIndex()` với server.
- [ ] SSR `heroImage` không còn là source of truth sau hydration.
- [ ] Client tự sync Hero theo `Date.now()`.
- [ ] Rotation không phụ thuộc vào `setInterval()` drift.
- [ ] Timer hướng tới boundary kế tiếp.
- [ ] Background tab được xử lý.
- [ ] Browser sleep/wake được xử lý.
- [ ] BFCache/pageshow được xử lý nếu phù hợp.
- [ ] Sticky image vẫn disable rotation.
- [ ] Multiple users cùng time slot thấy cùng Hero.
- [ ] Hero data cache TTL được tách khỏi rotation interval.
- [ ] Không thêm dependency.
- [ ] Không phá UI hiện tại.
- [ ] Không phá hydration.
- [ ] Không tạo memory leak.
- [ ] TypeScript/build/lint hiện tại vẫn pass.

---

# 27. Output bắt buộc của AI sau khi hoàn thành

Không chỉ nói "đã sửa".

Hãy báo cáo:

1. Những file đã thay đổi.
2. Thay đổi chính ở từng file.
3. Cách client xác định current slot.
4. Cách xử lý Cloudflare stale HTML.
5. Cách xử lý background/sleep.
6. Cách xử lý sticky image.
7. Hero data cache TTL hiện tại là bao nhiêu và tại sao.
8. Các command đã chạy để verify.
9. Kết quả từng command.
10. Nếu có vấn đề chưa verify được, phải nói rõ.

Quan trọng:

> Không tự mở rộng scope sang các vấn đề khác của project. Nếu phát hiện vấn đề ngoài task, chỉ report lại ở cuối, không tự sửa.
