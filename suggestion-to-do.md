# 💡 BẢNG ĐỀ XUẤT CẢI TIẾN & PHÁT TRIỂN (SUGGESTIONS & ROADMAP)

> **Dự án**: `svelte-chd` (CHD Travel — SvelteKit + TailwindCSS + Sanity Studio v3)  
> **Định hướng chiến lược**: Chuyển đổi từ một trang web dạng "Catalog sản phẩm" sang **Storytelling & Conversion Funnel** mang đậm tinh thần *"Go local — See local — Eat local"*.  
> **Quy chuẩn thực thi**: Tuân thủ [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md) & [LAYOUT_DESIGN_CONCEPT.md](LAYOUT_DESIGN_CONCEPT.md).

---

## 🧭 TRIẾT LÝ & ĐỊNH HƯỚNG TỔNG THỂ

1. **Bán Experience & Trust thay vì chỉ bán Tour catalog**:
   - Khách du lịch chọn một local agency nhỏ ở Tây Nguyên vì trải nghiệm bản địa đích thực, người bản địa dẫn dắt, và sự tin cậy.
2. **Loại bỏ tính năng cồng kềnh (No Over-engineering)**:
   - **KHÔNG làm**: Booking engine phức tạp, thanh toán online, tài khoản, giỏ hàng, lịch phòng trống, so sánh tour hay bộ máy tìm kiếm rườm rà.
   - **NÊN làm**: Luồng chuyển đổi tinh gọn: *Khám phá (Explore) → Yêu cầu (Enquire) → Trao đổi tư vấn cá nhân hóa (Human conversation)*.
3. **Đơn giản hóa UI (Minimalist & Editorial)**:
   - *"If everything is highlighted, nothing is highlighted"*. Giảm bớt badges, pills, decorations thừa trên thẻ tour.

---

## 🔴 NHÓM P0: BẮT BUỘC & ƯU TIÊN CAO NHẤT (CORE STORYTELLING & CONVERSION)

### 1.1. Cải tiến Trang Chủ (Home Page Transformation)
- [ ] **1.1.1. Tinh chỉnh Hero Section & CTA**
  - Làm nổi bật ngay slogan: `GO LOCAL · SEE LOCAL · EAT LOCAL` kèm một phụ đề ngắn gọn, cảm xúc.
  - Tối ưu 2 nút CTA: `Khám phá các tour` (primary moss) và `Trò chuyện cùng người bản địa / Liên hệ` (outline ink).
- [ ] **1.1.2. Thêm Section cốt lõi "Why CHD? / Triết lý Du lịch Bản địa"**
  - Thiết kế dạng editorial thanh lịch giới thiệu 4 giá trị:
    - `01 — Local People`: Đi cùng người dân thực sự sinh sống tại Tây Nguyên.
    - `02 — Real Places`: Buôn làng nhỏ, chợ địa phương, đồi cà phê, cánh rừng nguyên sinh.
    - `03 — Local Food`: Thưởng thức ẩm thực đúng cách của người bản địa.
    - `04 — Small Groups`: Không vội vã, hành trình chậm rãi và sâu sắc.
- [ ] **1.1.3. Thêm Section "Traveler Stories / Testimonials (Social Proof)"**
  - Hiển thị 3–6 cảm nhận thực tế từ du khách quốc tế/nội địa (tên, quốc gia, độ dài chuyến đi, rating 5 sao, ảnh chụp thật).
- [ ] **1.1.4. Đổi phân loại sản phẩm: `Day Tours` & `Multi-Day Tours`**
  - Chuyển wording từ `Highland Tours` (kỹ thuật) thành `Multi-day Tours` (*Stay longer. Go deeper*).
  - Định vị "Highland" như một chủ đề/điểm đến xuyên suốt (*coffee · villages · forests · food*).

### 1.2. Nâng cấp Trang Chi Tiết Tour & Luồng Đặt Chuyến Đi (Tour Detail & Conversion)
- [ ] **1.2.1. Bổ sung bảng tóm tắt "Trip Facts" ở đầu trang chi tiết Tour**
  - Hiển thị nhanh các thông số mấu chốt trước khi đọc chi tiết:
    - Tuyến điểm (vd: *Buon Ma Thuot → Lak Lake*)
    - Thời lượng (vd: *2 Days / 1 Night*)
    - Hình thức (vd: *Private / Small group*)
    - Độ khó & Điểm khởi hành.
- [ ] **1.2.2. Bổ sung mục "Good to know" (Thông tin cần biết cho du khách)**
  - Thời tiết & mùa lý tưởng, đồ dùng cần mang theo, chính sách đón tại khách sạn, tùy chọn ăn chay, quy mô đoàn.
  - Giảm thiểu các câu hỏi lặp lại qua email/tin nhắn.
- [ ] **1.2.3. Tính năng "Plan this trip" → Pre-filled Contact Form**
  - Bấm nút *"Lên kế hoạch chuyến đi này"* từ trang chi tiết tour sẽ tự động chuyển đến Form liên hệ và điền sẵn tên tour, thời lượng, giúp khách hàng gửi yêu cầu nhanh chóng và mượt mà.

### 1.3. Nâng cấp Nội dung Trang Giới Thiệu (About Us Transformation)
- [ ] **1.3.1. Viết lại câu chuyện thương hiệu About Us (Tạo dựng niềm tin)**
  - Mở rộng nội dung kể về:
    - *Who we are*: CHD Travel là ai?
    - *Why we started*: Tại sao thành lập và sứ mệnh phát triển du lịch bền vững tại Đắk Lắk / Tây Nguyên.
    - *Our home*: Tây Nguyên trong mắt những người con bản địa.
    - *How we travel & Our promise*: Cam kết không du lịch đại trà (No mass tourism), bảo vệ văn hóa & tự nhiên.

### 1.4. Chuẩn Hóa i18n & Kiểm Thử Giao Diện Mobile (Mobile QA)
- [ ] **1.4.1. Đưa toàn bộ Hard-coded Strings vào i18n Dictionary**
  - Chuyển các chuỗi hard-coded còn sót lại trong blog, tour, navigation và hàm trích xuất category vào `typesafe-i18n` (đầy đủ cho VN, EN, FR).
- [ ] **1.4.2. Kiểm thử toàn diện Mobile-first (Mobile QA)**
  - Rà soát hiển thị trên thiết bị di động cho Hero, Tour Card, Gallery, Tour Details, Navbar, và Contact Form.

---

## 🟠 NHÓM P1: RẤT ĐÁNG LÀM (BRANDING, SEO & EDITORIAL EXPERIENCES)

### 2.1. Định vị Blog thành "CHD Journal"
- [ ] **2.1.1. Tái cấu trúc chuyên mục Journal theo phong cách Editorial**
  - Phân nhóm bài viết: `Places`, `Food`, `People`, `Stories`, `Travel Tips`.
  - Ưu tiên các bài viết về con người bản địa (vd: *"Gặp gỡ người nông dân trồng cà phê"*).

### 2.2. Thêm Section "Featured Experiences" tại Trang Chủ
- [ ] **2.2.1. Giới thiệu trải nghiệm độc đáo trước danh sách Tour**
  - Section biên tập các lát cắt trải nghiệm: *Cà phê sớm mai tại nông trại*, *Buổi sáng ở chợ địa phương*, *Đêm lửa buôn làng*.

### 2.3. Tối ưu SEO Nâng Cao & Breadcrumbs
- [ ] **2.3.1. Bổ sung Breadcrumb Schema & Breadcrumb Navigation**
  - Cung cấp đường dẫn phân cấp: `Trang chủ → Tour → Tour 1 ngày / Dài ngày → Tên tour`.
- [ ] **2.3.2. Bổ sung `hreflang` Tags cho Đa ngôn ngữ**
  - Khai báo thẻ `rel="alternate" hreflang="vi" / "en" / "fr"` trong `<svelte:head>` hỗ trợ Google index đúng thị trường.
- [ ] **2.3.3. Tối ưu Schema JSON-LD `Article` cho Blog**
  - Hoàn thiện schema chi tiết cho bài viết Journal (headline, image, author, datePublished).

### 2.4. Tối ưu Footer kêu gọi hành động (Footer Conversion)
- [ ] **2.4.1. Thiết kế lại Footer dạng High-conversion**
  - Nhấn mạnh thông điệp thương hiệu kèm CTA *"Lên kế hoạch chuyến đi của bạn"* dẫn thẳng vào biểu mẫu tư vấn.

---

## ⚪ NHÓM P2: TÍNH NĂNG TẠM THỜI CHƯA CẦN LÀM (OUT OF SCOPE)

> Giữ cho sản phẩm tinh gọn, tránh lãng phí thời gian phát triển các tính năng chưa phù hợp:

- ❌ **Hệ thống thanh toán trực tuyến (Online Payment)**
- ❌ **Tài khoản người dùng & Đăng nhập (User Accounts)**
- ❌ **Giỏ hàng & Checkout (Cart & Checkout)**
- ❌ **Lịch đặt chỗ tự động (Availability Calendar)**
- ❌ **Hệ thống so sánh tour & Bộ máy tìm kiếm phức tạp**
- ❌ **Danh bạ điểm đến khổng lồ (Destination directory)**
