⚠️ 3. Có một vấn đề SEO quan trọng với "virtual slug"

Đây là điểm tôi khuyên sửa trước khi production.

get_tour_slug() hiện ưu tiên:

localized tour_name
↓
slugify
↓
URL

và chỉ fallback về tour_slug legacy sau đó.

Điều này có nghĩa:

Tour name hôm nay:
"Coffee Tour Buôn Ma Thuột"

URL:
/en/day-tours/coffee-tour-buon-ma-thuot

Sau này bạn sửa title thành:

"Authentic Coffee Tour in Buôn Ma Thuột"

thì URL tự động thành:

/authentic-coffee-tour-in-buon-ma-thuot

→ URL cũ chết.

Với website travel có SEO, đây không phải chuyện nhỏ.

Tôi sẽ đổi architecture thành:
Sanity
├── tour_id ← stable identity
├── tour_name.vi
├── tour_name.en
├── tour_name.fr
│
└── slug ← stable canonical slug

Nhưng không nhất thiết phải đưa tour_slug trở lại Sanity UI.

Có thể generate slug một lần khi tạo tour rồi giữ immutable.

Hoặc tốt hơn nữa:

tour_id = stable identity

URL:
/en/day-tours/{tour_id}-{slug}

Ví dụ:

/en/day-tours/chd-001-buon-ma-thuot-coffee-tour

Khi đổi title:

/en/day-tours/chd-001-authentic-coffee-experience

vẫn resolve được bằng chd-001.

Nếu site chưa có SEO traffic thì virtual slug hiện tại vẫn dùng được. Nhưng trước khi launch thì tôi sẽ xử lý.
=> trong backend có tourID
====
⚠️ 4. getTourBySlug() đang làm hơi nhiều việc

Current implementation:

getTourBySlug()
↓
getToursByType()
↓
load entire category
↓
loop tất cả tours
↓
test 7 kiểu slug

Cụ thể mỗi tour đang test:

localized slug VI
localized slug EN
localized slug FR
name VI
name EN
name FR
tour_id

rồi nếu không match mới direct GROQ.

Với vài chục tour thì không vấn đề gì.

Nhưng về architecture tôi không thích việc detail page phải load cả category chỉ để tìm một tour.

Nếu site sau này có 100–500 tours thì nên có query kiểu:

\*[
\_type in ["tourDaily", "tourCentral"]
&& (
slugify(tourName.vi) == $slug ||
slugify(tourName.en) == $slug ||
slugify(tourName.fr) == $slug ||
tourId == $slug
)
][0]

hoặc tốt nhất là có stable slug/index field.

==
⚠️ 5. Có một đoạn logic trong modal tôi muốn sửa

Trong commit mới có:

tour?.tour_duration?.en?.toLowerCase().includes('day') === false ||
tour?.tour_duration?.vi?.toLowerCase().includes('ngày') === false

Logic này dễ sai vì dùng ||.

Ví dụ:

en = "3 days"
vi = "3 ngày"

thì:

en.includes("day") === false // false
vi.includes("ngày") === false // false

OK.

Nhưng chỉ cần một locale thiếu / format khác, biểu thức có thể classify thành highland-tours ngoài ý muốn.

Trong khi category đã được canonicalize ở server rồi.

Không nên suy luận category từ duration ở modal nữa.

Nên ưu tiên:

canonicalCategory

được truyền từ route.

Tức:

URL
↓
resolve_canonical_category()
↓
server load
↓
canonicalCategory
↓
modal

# Không cần đoán lại.

===
⚠️ 6. TourService vẫn còn một chút duplicate logic

Đoạn này xuất hiện cả ở category search và global search:

const vVi = get_tour_slug(t, 'vi')
const vEn = get_tour_slug(t, 'en')
const vFr = get_tour_slug(t, 'fr')
const nameVi = slugify(...)
const nameEn = slugify(...)
const nameFr = slugify(...)
const tourId = ...

Nên extract:

const matchesTourSlug = (tour: Tour, targetSlug: string) => {
...
}

sau đó:

categoryTours.find(t => matchesTourSlug(t, targetSlug))

# Code sẽ dễ đọc hơn rất nhiều.

Nhưng vấn đề cũ vẫn cần xử lý

Legacy /api/tours vẫn là thứ tôi muốn xoá.

Nó không còn cần thiết cho frontend hiện tại và trước đó search cũng không thấy frontend consumer của endpoint này.

Đặc biệt endpoint cũ còn chứa logic:

GET /api/tours
↓
fetch exchange rate
↓
SANITY_WRITE_TOKEN
↓
createOrReplace
↓
patch tour documents
↓
delete old exchange-rate documents

Đưa write capability vào public GET route là architecture không đáng giữ.

Nếu commit này chưa xoá nó thì:

P0 — xoá /api/tours/+server.ts.

Exchange rate thì giữ ExchangeService nếu frontend vẫn dùng conversion hiện tại; chỉ tách phần sync/write thành GitHub Action (sync-rates.yml) hoặc scheduled job.
==> đánh giá lại cái này cho tôi
===
đồng thời tôi vừa kiểm tra trong backend vẫn còn nhìu cái có slug, hãy bỏ hết đi không càn thiết, và tôi thấy có tour tag trong backend, đánh giá coi hệ thống có dùng và có cần dùng tour tag đó không?
