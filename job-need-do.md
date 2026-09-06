# Instruction: Thêm 2 lớp bảo vệ khi Sanity CMS sập

**Repo:** akhademik/svelte-chd (branch: develop)
**Stack:** SvelteKit + `@sveltejs/adapter-cloudflare`, deploy trên Cloudflare Pages, data lấy từ Sanity CMS.

## Bối cảnh

Hiện tại toàn bộ tour, blog, tỷ giá đều fetch live từ Sanity qua `front-end/src/lib/server/sanity-client.ts`. Khi Sanity sập:

- `fetchToursByType`, `fetchFeaturedBlogs`, `fetchAllBlogs` → catch lỗi, trả về `[]` → trang render rỗng.
- `fetchSingleTourBySlug` → catch lỗi, trả về `null` → route `[tourtype]/[slug]/+page.server.ts` coi `null` là "not found" → **throw 404 sai** (thực ra là lỗi kết nối, không phải không tồn tại).
- `blog/[slug]/+page.server.ts` cũng catch lỗi rồi throw 404 tương tự.
- Không có cache CDN nào thực sự hoạt động ở tầng Cloudflare (xem Layer 1), và không có bản snapshot dữ liệu nào để fallback (xem Layer 2).

Yêu cầu: implement 2 lớp bảo vệ độc lập, bổ sung cho nhau:

- **Layer 1 – CDN cache có `stale-if-error`**: giảm tải Sanity, chống downtime ngắn (vài giờ tới vài ngày) bằng cache ở edge Cloudflare.
- **Layer 2 – Snapshot backup trong Workers KV**: chống downtime dài (nhiều ngày/tuần) bằng cách lưu lại bản dữ liệu tour/blog "tốt cuối cùng", đọc lại khi Sanity fail hẳn.

Đồng thời sửa lỗi phân loại 404 vs lỗi kết nối, vì nó ảnh hưởng cả 2 layer.

---

## Layer 1: CDN Cache với `stale-if-error` (Cloudflare Cache Rule)

### 1.1. Vấn đề cần biết trước khi code

Cloudflare **không tự cache HTML** dù response có header `Cache-Control` hợp lệ, trừ khi có **Cache Rule** ở dashboard chỉ định rõ zone/route đó "Eligible for Cache" + Edge TTL "Respect Origin". Nếu không có Cache Rule, mọi header `s-maxage`/`stale-while-revalidate`/`stale-if-error` hiện tại trong `setHeaders(...)` **không có tác dụng gì ở tầng CDN** — chỉ ảnh hưởng browser cache.

→ Việc này gồm 2 phần: (a) sửa code header, (b) cấu hình dashboard Cloudflare. AI code chỉ làm được phần (a); phần (b) liệt kê ra để người vận hành tự làm tay trên dashboard.

### 1.2. Việc cần code (phần a)

Sửa header `cache-control` trong các file sau, thêm `stale-if-error`:

| File                                                            | Header hiện tại                                                 | Header mới                                                                                                       |
| --------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `front-end/src/routes/[lang]/+page.server.ts`                   | `public, max-age=0, s-maxage=1800, stale-while-revalidate=3600` | `public, max-age=0, s-maxage=1800, stale-while-revalidate=3600, stale-if-error=259200`                           |
| `front-end/src/routes/[lang]/blog/+page.server.ts`              | `public, max-age=0, s-maxage=1800, stale-while-revalidate=3600` | thêm `, stale-if-error=259200`                                                                                   |
| `front-end/src/routes/[lang]/blog/[slug]/+page.server.ts`       | `public, max-age=0, s-maxage=3600, stale-while-revalidate=7200` | thêm `, stale-if-error=604800`                                                                                   |
| `front-end/src/routes/[lang]/[tourtype]/+page.server.ts`        | `public, max-age=0, s-maxage=1800, stale-while-revalidate=3600` | thêm `, stale-if-error=259200`                                                                                   |
| `front-end/src/routes/[lang]/[tourtype]/[slug]/+page.server.ts` | _(hiện chưa có `setHeaders`)_                                   | thêm `setHeaders` mới với `public, max-age=0, s-maxage=3600, stale-while-revalidate=7200, stale-if-error=604800` |

Giải thích số giây: `259200` = 3 ngày, `604800` = 7 ngày. Trang chi tiết tour/blog nên giữ `stale-if-error` lâu hơn trang danh sách vì nó quan trọng hơn cho SEO/booking. Có thể điều chỉnh theo nhu cầu thực tế.

### 1.3. Việc cần làm tay trên dashboard Cloudflare (KHÔNG code được, chỉ ghi chú lại trong PR description hoặc README để người vận hành tự làm)

1. Vào **Cloudflare Dashboard → Zone (domain của site) → Caching → Cache Rules**.
2. Tạo 1 Cache Rule mới:
   - **When incoming requests match**: Hostname = domain của site, và (tuỳ chọn) loại trừ path `/api/*` nếu có endpoint không nên cache.
   - **Then**:
     - Cache eligibility: **Eligible for cache**
     - Edge TTL: **Use cache-control header if present, otherwise use...** (chọn tuỳ Cloudflare bản hiện tại gọi là "Respect origin")
     - Browser TTL: **Respect origin** (hoặc theo nhu cầu)
3. Đảm bảo response không có `Set-Cookie` hoặc request không có header `Authorization` cho các route công khai (tour/blog/trang chủ) — nếu có, Cloudflare sẽ tự bypass cache bất kể Cache Rule.
4. Deploy xong, dùng `curl -I https://domain/vi` kiểm tra có header `cf-cache-status: HIT` (sau lần request thứ 2) để xác nhận cache đã hoạt động.

### 1.4. Lưu ý khi code AI cần biết

- Không set `stale-if-error` cho bất kỳ route nào có dữ liệu cá nhân hoá / theo session (hiện tại không có route nào như vậy trong danh sách trên, nhưng nếu sau này thêm thì nhớ loại trừ).
- Route `api/booking`, `api/tours` (nếu có POST) không được thêm cache header kiểu `public` vì có thể là non-idempotent — kiểm tra trước khi áp dụng đồng loạt.

---

## Layer 2: Snapshot Backup bằng Cloudflare Workers KV

### 2.1. Nguyên lý

Mỗi khi fetch Sanity **thành công**, lưu thêm 1 bản copy dữ liệu vào Workers KV (key cố định theo loại dữ liệu). Khi fetch Sanity **thất bại**, đọc lại bản KV gần nhất đó thay vì trả về `[]`/`null`/default cứng. KV không tự hết hạn (trừ khi set TTL) nên bản snapshot sẽ tồn tại vô thời hạn cho tới lần ghi tiếp theo — đúng yêu cầu "ngày 1 tốt, ngày 2-30 fail vẫn dùng data ngày 1".

### 2.2. Cấu hình binding KV

**Bước 1 — Tạo KV namespace** (làm 1 lần, qua Cloudflare dashboard hoặc CLI):

```bash
npx wrangler kv namespace create SANITY_SNAPSHOT
npx wrangler kv namespace create SANITY_SNAPSHOT --preview
```

Lệnh trên trả về `id` và `preview_id`. Nếu project dùng Cloudflare Pages qua Git integration (không có `wrangler.toml` sẵn — đã kiểm tra repo hiện tại chưa có file này), có 2 cách:

- **Cách A (khuyến nghị, không cần thêm file config)**: vào Cloudflare Pages dashboard → project → **Settings → Functions → KV namespace bindings** → Add binding, variable name `SANITY_SNAPSHOT_KV`, chọn namespace vừa tạo. Làm cho cả Production và Preview environment.
- **Cách B**: tạo file `front-end/wrangler.toml` với nội dung:

```toml
name = "chd-travel-frontend"
compatibility_date = "2024-09-01"

[[kv_namespaces]]
binding = "SANITY_SNAPSHOT_KV"
id = "<id trả về ở bước 1>"
preview_id = "<preview_id trả về ở bước 1>"
```

Chỉ chọn 1 trong 2 cách, không làm cả 2 (tránh xung đột config). Nếu không chắc pipeline hiện tại dùng Git integration hay Wrangler CLI để deploy, hỏi lại người yêu cầu trước khi chọn cách B.

**Bước 2 — Khai báo type cho binding** trong `front-end/src/app.d.ts`:

```ts
import type { Locales } from "./i18n/i18n-types";

declare global {
  namespace App {
    interface Locals {
      locale: Locales;
    }
    interface Platform {
      env: {
        SANITY_SNAPSHOT_KV: KVNamespace;
      };
    }
  }
}

export {};
```

Cần cài `@cloudflare/workers-types` nếu chưa có (`pnpm add -D @cloudflare/workers-types --filter ./front-end`) và thêm vào `tsconfig.json` của front-end phần `"types": ["@cloudflare/workers-types"]` nếu chưa có, để type `KVNamespace` được nhận diện.

### 2.3. Sửa `front-end/src/lib/server/sanity-client.ts`

Nguyên tắc sửa:

1. Các hàm cần fallback KV: `fetchToursByType`, `fetchSingleTourBySlug`, `fetchFeaturedBlogs`, `fetchAllBlogs`, `fetchLatestExchangeRates`.
2. Mỗi hàm cần nhận thêm tham số `kv?: KVNamespace` (optional, để không phá vỡ chỗ gọi cũ nếu có, nhưng nên cập nhật hết các nơi gọi để truyền `platform?.env?.SANITY_SNAPSHOT_KV`).
3. Logic chung cho mỗi hàm (viết thành 1 helper dùng chung, đừng copy-paste 5 lần):

```ts
// Thêm vào sanity-client.ts, phía trên các hàm fetch hiện có
async function withKvSnapshot<T>(
  kv: KVNamespace | undefined,
  snapshotKey: string,
  fetcher: () => Promise<T>,
  isValidResult: (data: T) => boolean,
): Promise<T> {
  try {
    const fresh = await fetcher();
    if (isValidResult(fresh) && kv) {
      // Ghi snapshot ở background, không block response, không throw nếu KV lỗi
      kv.put(snapshotKey, JSON.stringify(fresh)).catch((err) =>
        console.warn(`[KV snapshot write failed] ${snapshotKey}:`, err),
      );
    }
    if (isValidResult(fresh)) return fresh;
    throw new Error(
      `Invalid result for ${snapshotKey}, falling back to snapshot`,
    );
  } catch (err) {
    console.warn(
      `[Sanity fetch failed, trying KV snapshot] ${snapshotKey}:`,
      err,
    );
    if (kv) {
      const cached = await kv.get(snapshotKey);
      if (cached) {
        console.warn(`[KV snapshot HIT] ${snapshotKey}`);
        return JSON.parse(cached) as T;
      }
    }
    console.error(`[KV snapshot MISS, no fallback available] ${snapshotKey}`);
    throw err;
  }
}
```

4. Áp dụng vào từng hàm, ví dụ với `fetchToursByType`:

```ts
export const fetchToursByType = async (
  tourType: string,
  kv?: KVNamespace,
): Promise<Tour[]> => {
  return cachedFetch(`tours-${tourType}`, 5 * 60 * 1000, async () => {
    return withKvSnapshot(
      kv,
      `snapshot:tours:${tourType}`,
      async () => {
        // ... giữ nguyên logic query Sanity hiện tại, KHÔNG tự catch nuốt lỗi nữa ...
        // (bỏ try/catch cũ trả về [] — để lỗi throw ra ngoài cho withKvSnapshot xử lý)
      },
      (data) => Array.isArray(data) && data.length > 0,
    );
  });
};
```

Áp dụng tương tự cho `fetchSingleTourBySlug`, `fetchFeaturedBlogs`, `fetchAllBlogs`, `fetchLatestExchangeRates` — mỗi hàm 1 `snapshotKey` riêng biệt, ví dụ:

- `snapshot:tour:${tourType || 'all'}:${slug}`
- `snapshot:featured-blogs`
- `snapshot:all-blogs`
- `snapshot:exchange-rates`

**Quan trọng**: bỏ hết các `catch { return [] }` / `catch { return null }` / `catch { return defaultRates }` hiện có bên trong các hàm này — để lỗi thật sự throw ra, vì `withKvSnapshot` cần thấy exception mới biết fallback sang KV. Nếu vẫn catch và return `[]` như cũ thì `withKvSnapshot` tưởng đó là kết quả hợp lệ (hoặc theo `isValidResult` check) và sẽ không bao giờ đọc snapshot.

`fetchLatestExchangeRates` vẫn giữ `DEFAULT_EXCHANGE_RATES` làm **fallback cuối cùng sau cả KV** (KV miss thì mới rơi về default cứng), không xoá constant này.

5. Cập nhật chữ ký hàm ở mọi nơi gọi (`+page.server.ts`, `+layout.server.ts`) để truyền `platform.env.SANITY_SNAPSHOT_KV`:

```ts
// ví dụ: [lang]/+page.server.ts
export const load: PageServerLoad = async ({ setHeaders, platform }) => {
	...
	const kv = platform?.env?.SANITY_SNAPSHOT_KV
	const [dayTours, highlandTours, featuredPosts] = await Promise.all([
		fetchToursByType('day-tours', kv),
		fetchToursByType('highland-tours', kv),
		fetchFeaturedBlogs(kv),
	])
	...
}
```

Làm tương tự cho: `blog/+page.server.ts`, `blog/[slug]/+page.server.ts`, `[tourtype]/+page.server.ts`, `[tourtype]/[slug]/+page.server.ts`, `+layout.server.ts`.

### 2.4. Sửa phân loại lỗi 404 thật vs lỗi kết nối (bắt buộc, liên quan trực tiếp tới Layer 2)

Vấn đề hiện tại: khi `fetchSingleTourBySlug`/blog detail throw lỗi (kể cả sau khi đã thử KV mà vẫn miss), route đang coi đó là "not found" → trả 404. Cần sửa để phân biệt 3 trường hợp:

1. Sanity + KV đều fail hoàn toàn → **503** (tạm thời không truy cập được), KHÔNG phải 404.
2. Sanity/KV trả về thành công nhưng không có bản ghi nào khớp slug → **404 thật**.
3. Sanity/KV trả về thành công, có dữ liệu → render bình thường.

Sửa `front-end/src/routes/[lang]/[tourtype]/[slug]/+page.server.ts`:

```ts
export const load: PageServerLoad = async ({
  params,
  setHeaders,
  platform,
}) => {
  const { tourtype, slug } = params;
  if (!tourtype || !slug) throw error(404, "Tour not found");

  setHeaders({
    "cache-control":
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=7200, stale-if-error=604800",
  });

  const kv = platform?.env?.SANITY_SNAPSHOT_KV;

  let tour, allCategoryTours;
  try {
    [tour, allCategoryTours] = await Promise.all([
      fetchSingleTourBySlug(slug, tourtype, kv),
      fetchToursByType(tourtype, kv),
    ]);
  } catch (err) {
    console.error(
      "[Tour detail load — total failure, no snapshot available]:",
      err,
    );
    throw error(
      503,
      "Tạm thời không thể tải dữ liệu, vui lòng thử lại sau ít phút.",
    );
  }

  if (!tour) {
    throw error(404, "Tour not found");
  }

  return { tourtype, slug, tour, allCategoryTours };
};
```

Sửa tương tự cho `front-end/src/routes/[lang]/blog/[slug]/+page.server.ts` (throw 503 nếu `sanityClient.fetch` lẫn KV đều fail, throw 404 nếu fetch thành công mà `post` là null).

Tạo trang lỗi thân thiện cho mã 503 (SvelteKit tự dùng `src/routes/+error.svelte` nếu có, kiểm tra file này đã tồn tại chưa, nếu chưa thì tạo, hiển thị thông điệp khác nhau tuỳ `$page.status === 503` so với `404`).

### 2.5. Việc KHÔNG nằm trong scope này (ghi rõ để AI không tự ý làm thêm)

- Không cần snapshot ảnh (Sanity Image CDN) — chi phí lưu binary vào KV/R2 và độ phức tạp không tương xứng với lợi ích ở quy mô site này. Nếu sau này cần, làm riêng 1 task khác dùng R2 (không dùng KV vì KV giới hạn value 25MB/item và không tối ưu cho binary lớn).
- Không sửa `scripts/sync-rates.js` (cron tỷ giá) — nó đã có `DEFAULT_EXCHANGE_RATES` làm fallback riêng, không cần KV.
- Không cần Durable Objects hay D1 — KV là đủ cho use case đọc nhiều, ghi ít này.

---

## 2.6. Kế hoạch test trước khi merge

1. **Test Layer 2 độc lập với Layer 1**: tạm sửa `sanityClient` throw lỗi giả (hoặc đổi tạm `projectId` sai) trong môi trường local/preview, xác nhận:
   - Lần đầu tiên (trước khi có lỗi), trang tour/blog vẫn load bình thường và có ghi log `[KV snapshot write]` (kiểm tra qua `wrangler kv key list` hoặc dashboard).
   - Sau khi làm Sanity "sập" giả, reload lại trang → vẫn thấy đúng dữ liệu cũ (không phải rỗng, không phải 404), có log `[KV snapshot HIT]`.
   - Xoá key snapshot đó đi rồi giả lập Sanity sập lại → lần này phải trả về 503 (không phải 404, không phải trang trắng).
2. **Test Layer 1**: sau khi cấu hình Cache Rule, `curl -I` một route đã cache 2 lần liên tiếp, xác nhận `cf-cache-status: HIT` ở lần 2.
3. Chạy lại toàn bộ `pnpm check:all` và `pnpm lint:all` sau khi sửa, đảm bảo không phá vỡ CI (`ci.yml`) — đặc biệt chú ý phần `svelte-check` với type mới `KVNamespace` cần môi trường CI cũng cài `@cloudflare/workers-types` (thêm vào `devDependencies`, không phải chỉ cài local).
