3. Nhưng vẫn còn một vấn đề: alias vẫn quá nhiều ⚠️

Đây là điểm tôi chưa cho rằng đã clean hoàn toàn.

Trong config vẫn còn:

sand
sand-alt
sand-card

moss
moss-hover
moss-dark

terracotta
ochre

charcoal
charcoal-dark

accent
accent-deep
accent-warm

stone-50 ... stone-950

tức semantic system đã được thêm vào nhưng legacy/brand aliases vẫn được giữ lại.

Đặc biệt:

primary = #5F6E56
moss = #5F6E56
accent = #5F6E56

và:

secondary = #A3764A
terracotta = #A3764A
ochre = #A3764A
accent-warm = #A3764A

Về mặt runtime không sai.

Nhưng về design-system architecture, đây vẫn là:

## 1 màu → nhiều tên.

4. Tôi thấy quyết định giữ stone-\* là hợp lý

Điểm này tôi đổi đánh giá so với lần trước.

Trong commit mới bạn đã ghi rõ:

TONAL SCALE (Internal Stone Scale)

và tách nó khỏi semantic tokens.

Tôi đồng ý giữ.

Nó có thể đóng vai trò primitive palette:

stone-50
stone-100
...
stone-950

Trong khi UI sử dụng:

surface
foreground
border
inverse

Đây là architecture hợp lý:

Primitive
↓
Semantic
↓
Component 5. Nhưng stone-\* cần được enforce là INTERNAL

Đây là việc tôi khuyên làm tiếp.

Hiện config nói:

TONAL SCALE (Internal Stone Scale)

nhưng Tailwind không biết "internal" nghĩa là gì.

Developer vẫn có thể viết:

text-stone-600

bất kỳ lúc nào.

Tôi muốn convention rõ:

❌ Component code
text-stone-600
bg-stone-100
border-stone-200
✅ Component code
text-foreground-muted
bg-background
border-border
stone-\* chỉ được dùng
định nghĩa semantic token
một số trường hợp đặc biệt thực sự cần tonal control
primitive/internal component
=== 6. Một vấn đề semantic tôi phát hiện trong documentation

Bạn đang định nghĩa:

primary = Moss

và nói:

"tiêu đề H1/H2 nổi bật"

Đây là chỗ tôi không hoàn toàn đồng ý.

primary nên đại diện cho:

primary interactive brand color

chứ không nên mặc định có nghĩa:

"heading color".

Ví dụ:

<h1 class="text-primary">

không sai về visual, nhưng semantic hơi lệch.

Tôi sẽ quy ước:

foreground

cho typography mặc định.

primary dành cho:

CTA
link
active
selected
brand emphasis
interactive

# Nếu CHD muốn H1 màu moss trên một số landing sections thì đó là editorial treatment, không nên biến primary thành "heading color".

7. inverse đang có một điểm cần chỉnh

Config hiện:

inverse #2B2A24
inverse-dark #1E1D19
inverse-foreground #DFD5B9

Tốt.

Nhưng documentation trước đó nói:

inverse = #1E1D19 / #2B2A24

Điều này hơi mơ hồ.

Nên định nghĩa rõ:

inverse
inverse-dark

và component chọn cái nào.

Ví dụ:

Footer → inverse
Hero → inverse-dark

thay vì:

bg-inverse
bg-charcoal
bg-stone-950
=== 9. Quan trọng: Gold và Teal vẫn đang nằm ngoài semantic system

Documentation vẫn ghi:

Gold = #B8862E
Teal = #3D6E7C

Nếu hai màu này thực sự đang được sử dụng trong UI, tôi khuyên đưa chúng thành semantic token:

highlight
highlight-hover

và:

destination
destination-hover

hoặc nếu chúng chỉ xuất hiện 1–2 chỗ:

đừng đưa vào global palette.

## Đây là chỗ cần kiểm tra usage thực tế trước khi quyết định.

Một việc tôi đặc biệt khuyên làm tiếp

Đừng xóa sand/moss/terracotta/ochre/charcoal ngay.

Trước tiên phải đảm bảo toàn bộ src/\*_/_.svelte đã migrate hết sang semantic token. Sau đó mới xóa aliases.

Nếu xóa sớm, Tailwind sẽ báo thiếu class nhưng khó biết component nào còn phụ thuộc.
