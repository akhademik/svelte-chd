2. Có backend nào frontend CHƯA sử dụng?
   Có — ít nhất 2 cái khá rõ.
   fetchSingleTourBySlug()

Trong sanity-client.ts có:

export const fetchSingleTourBySlug = async (...)

Nhưng search toàn repo hiện tại không thấy frontend gọi function này.

Điều này khá đáng chú ý.

Nếu frontend có route dạng:

/[lang]/[tourtype]/[slug]

thì tôi kỳ vọng route đó phải gọi fetchSingleTourBySlug().

Nếu hiện tại detail tour đang lấy dữ liệu theo cách khác, thì cần xem lại vì backend đã có abstraction dành riêng cho việc này nhưng đang bị bỏ không.

## -> hiện frontend đang làm việc này, vậy hãy chỉnh lại backend bỏ luôn field generate slug đi, ko cần thiết nữa

---

fetchLatestExchangeRates()

Backend cũng có:

fetchLatestExchangeRates()

Nhưng tôi không tìm thấy frontend hiện tại sử dụng nó.

Do đó:

fetchLatestExchangeRates()
DEFAULT_EXCHANGE_RATES
EXCHANGE_RATES_QUERY

hiện có vẻ là dead backend capability.

Nếu frontend không còn hiển thị conversion USD/EUR → VND thì tôi sẽ xóa toàn bộ phần này, thay vì giữ code "phòng khi sau này dùng".
=> cái này xem lại vì cơ chết là backend ko dùng, ko caal api cho rate nữa, mà là CI/CD git sẽ chạy tự động hàng ngày, sau đó ghi ngược lại vào backend, nhưng tôi kiểm tra thấy thì nó ko hoạt động, hiện giờ trong backend vẫn là rate của 2 hôm trước ko phải thời điểm hiện tại

==== 3. Một thứ khác tôi đặc biệt chú ý: ALL_TOURS_QUERY

Backend có:

ALL_TOURS_QUERY

và fetchToursByType() có fallback:

else {
rawData = await sanityClient.fetch(ALL_TOURS_QUERY)
}

Nhưng frontend hiện chỉ gọi:

fetchToursByType('day-tours')
fetchToursByType('highland-tours')

Do đó nhánh:

else {
fetch(ALL_TOURS_QUERY)
}

hiện không cần thiết cho frontend hiện tại, trừ khi bạn muốn giữ public/internal API flexibility.

Tôi nghiêng về:

Không cần xoá ALL_TOURS_QUERY, nhưng không nên expose fallback kiểu "unknown type → lấy tất cả".

Tốt hơn:

type TourType = 'day-tours' | 'highland-tours'

và function:

fetchToursByType(type: TourType)

Như vậy TypeScript sẽ bắt lỗi ngay nếu sau này gọi:

# fetchToursByType('foo')

===== 5. Nhưng tôi muốn sửa withKvSnapshot() một chút

Hiện tại:

const fresh = await fetcher()

if (isValidResult(fresh) && kv) {
kv.put(...)
}

if (isValidResult(fresh)) return fresh

Ý tưởng đúng.

Nhưng có một vấn đề:

isValidResult() đang đồng nghĩa với "có dữ liệu"

Ví dụ tours:

data => Array.isArray(data) && data.length > 0

Điều đó có nghĩa:

Sanity trả []
↓
coi là lỗi
↓
load snapshot cũ

Nếu bạn thực sự xoá toàn bộ tours khỏi Sanity, website vẫn có thể hiển thị tour cũ.

Đây là một trade-off khá nguy hiểm.

Ví dụ:

Bạn xoá một tour vì tour không còn bán.

Sanity:

[]

Backend:

[] → invalid

KV:

tour cũ

Website:

vẫn hiển thị tour đã xoá.

Tôi khuyên thay đổi semantic:

Phân biệt:

fetch failed

với:

valid empty result

Ví dụ:

const fresh = await fetcher()

if (isValidResult(fresh)) {
await saveSnapshot(...)
return fresh
}

throw ...

nhưng isValidResult phải cho phép empty array nếu empty là trạng thái hợp lệ.

Ví dụ tours:

data => Array.isArray(data)

Blog cũng vậy.

Sau đó nếu Sanity throw exception mới fallback KV.

# Đây là thay đổi tôi đánh giá P0/P1.

=== 6. kv.put() background là hợp lý, nhưng nên có expiration

Hiện tại:

kv.put(snapshotKey, JSON.stringify(fresh))

Tôi sẽ thêm TTL.

Ví dụ:

kv.put(snapshotKey, JSON.stringify(fresh), {
expirationTtl: 60 _ 60 _ 24 \* 30
})

hoặc 7 ngày/30 ngày tùy bạn.

Vì snapshot này là:

disaster recovery cache

chứ không phải database.

Tôi thích model:

CDN cache → minutes
Worker memory → minutes
KV snapshot → days
Sanity → source of truth

Rất clean.

==== 7. sanity-client.ts vẫn hơi quá nhiều trách nhiệm

Hiện file này đang chứa:

Sanity client +
memory cache +
KV fallback +
tour queries +
blog queries +
exchange rate +
mapping

Bạn đã bắt đầu refactor rất đúng hướng:

server/
sanity/
queries/
tours.ts
blogs.ts
mappers/
tour.mapper.ts
blog.mapper.ts

Tôi sẽ đi thêm một bước cuối.

Tôi muốn:
server/
├── sanity/
│ ├── client.ts
│ ├── queries/
│ │ ├── tours.ts
│ │ └── blogs.ts
│ └── mappers/
│ ├── tour.mapper.ts
│ └── blog.mapper.ts
│
├── cache/
│ ├── memory-cache.ts
│ └── kv-snapshot.ts
│
├── tours/
│ └── tour-service.ts
│
├── blogs/
│ └── blog-service.ts
│
└── email/
├── email.ts
└── email-template.ts

Khi đó:

tour-service
↓
cache
↓
sanity

# Frontend không cần biết Sanity tồn tại.

8. Compatibility layer vẫn là phần backend tôi không thích nhất

Trong EXTRACT_TOUR_FIELDS bạn vẫn đang support rất nhiều tên cũ:

best_sell
bestSellerTour
bestSell

tour_highlights
tourHighlights

tour_itinerary
tourItinerary

tour_price
tourPrice

tour_id
tourId

img_tour
imgTour

tour_duration
tourDuration

tour_slug
tourSlug

tour_intro
tourIntro

và cả nhiều \_type:

day-tours
tourDaily
day_tours
daily_tour

highland-tours
tourCentral
highland_tours
Đây là technical debt lớn nhất còn lại của backend.

Tôi hiểu tại sao bạn làm vậy: giữ compatibility với data cũ.

Nhưng nếu Sanity Studio hiện đã được migrate hết thì:

Đừng tiếp tục mang compatibility layer này vào production.

Canonical schema nên chỉ còn:

day-tours
highland-tours

và:

tour_name
tour_slug
tour_intro
tour_price
tour_duration
...

Backend sẽ giảm rất nhiều complexity.
==> kiểm tra coi type của backend nó đang dùng cái gì thì chuẩn hóa dùng cái đó các phần còn lại code trên bỏ đi
=== 10. Nhưng contact form còn một vấn đề backend

Bạn đang gửi:

name
email
phone
langs
tags
msg

tới Discord:

content: `...`

và email.

Nếu website bắt đầu có traffic thật, tôi sẽ thêm:

Rate limiting

Hiện chưa thấy cơ chế kiểu:

IP
email
cookie
fingerprint

để chống spam.

Không cần database.

Với Cloudflare, lý tưởng nhất là:

POST /contact
↓
Cloudflare rate limit
↓
SvelteKit action

Ví dụ:

5 submissions / 10 minutes / IP

hoặc thậm chí:

3 / 10 min

đủ cho travel website.

# Đây là thứ tôi sẽ ưu tiên trước khi public mạnh.

11. Có một backend feature tôi nghĩ bạn nên XÓA nếu không dùng
    Exchange rate

Nếu UI hiện tại không còn có:

USD
EUR
VND conversion

thì bỏ:

fetchLatestExchangeRates
EXCHANGE_RATES_QUERY
DEFAULT_EXCHANGE_RATES
ExchangeRatesData
snapshot:exchange-rates

Không nên giữ.

Backend tốt không phải backend có nhiều capability.

Backend tốt là:

# mọi capability đều có consumer thực sự.

=== 13. Một điểm nữa: type của tourType nên mạnh hơn

Hiện:

fetchToursByType = async (tourType: string, ...)

Tôi sẽ đổi thành:

export type TourType = 'day-tours' | 'highland-tours'

rồi:

fetchToursByType(
tourType: TourType,
kv?: KVNamespace
)

Điều này giúp xoá luôn:

if (...)
else if (...)
else if (...)
else

và backend trở nên deterministic.
