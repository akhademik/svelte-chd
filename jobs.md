Nhưng tôi phát hiện 2 vấn đề mới đáng chú ý
⚠️ 1. Category vẫn đang bị suy luận lại trong component

Ở modal/card vẫn có logic kiểu:

currentTour?.\_type === 'tourCentral' ||
currentTour?.tour_duration?.en?.toLowerCase().includes('day') === false ||
currentTour?.tour_duration?.vi?.toLowerCase().includes('ngày') === false

→ highland-tours

Nếu:

\_type = tourDaily
tour_duration.en = undefined

thì:

undefined?.includes(...) === false

có thể làm expression classify thành Highland.

Đây là logic tôi vẫn muốn loại bỏ.

Category đã có nguồn chính xác:

tourDaily → day-tours
tourCentral → highland-tours

Không cần suy luận từ tour_duration.

Tôi sẽ làm:

const getTourCategory = (tour: Tour): TourType =>
tour.\_type === 'tourCentral'
? 'highland-tours'
: 'day-tours'

hoặc tốt hơn nữa: category đã được xác định ở server thì truyền xuống luôn.

Priority: P1.

---

⚠️ 2. getTourBySlug() vẫn hơi over-engineered

Current flow vẫn là:

getTourBySlug()
↓
getToursByType()
↓
load toàn bộ category
↓
loop tours
↓
check 7 variants
↓
nếu không có → direct Sanity

Trong đó check:

vi slug
en slug
fr slug
vi name
en name
fr name
tour_id

Đối với site hiện tại thì performance không đáng lo vì số tour ít.

Nhưng code có thể đơn giản hóa đáng kể bằng helper:

matchesTourSlug(tour, targetSlug)

rồi:

categoryTours.find(t => matchesTourSlug(t, targetSlug))

Priority: P2.
