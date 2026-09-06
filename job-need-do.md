1. Why CHD — giữ nguyên, khá tốt

Section mới này tôi đánh giá 8.5/10.

Bạn đã làm khá đúng tinh thần editorial:

01 / 02 / 03 / 04
people
nature
food
compass
typography serif
sand / moss / terracotta
không dùng icon-card kiểu travel template.

Đặc biệt tôi thích việc bạn không biến nó thành 4 cái card màu mè.

Nhưng tôi sẽ sửa một điểm

Hiện tại:

01
title
description

02
title
description

03
title
description

04
title
description

Nó vẫn hơi giống một corporate values section.

CHD có lợi thế rất lớn ở câu:

Go local — See local — Eat local

Tôi nghĩ nên biến section này thành thứ đặc trưng của CHD, thay vì generic "Why choose us".

Ví dụ concept:

WHY CHD

We don't take you to the Highlands.
We take you into it.

01 GO LOCAL
Meet the people who call this place home.

02 SEE LOCAL
Go beyond the places listed in guidebooks.

03 EAT LOCAL
Taste what people here actually eat.

04 TRAVEL SLOW
Small groups. More time. Less rushing.

## Đặc biệt: Go local / See local / Eat local nên xuất hiện nhiều hơn trong website. Nó chính là brand positioning.

Nhưng có một vấn đề lớn hơn

Testimonials hiện đang lấy từ:

defaultTestimonials

và server cũng load:

import defaultTestimonials from '$lib/constants/testimonials.json'

Điều này ổn cho hiện tại, nhưng về content architecture tôi sẽ chuyển testimonials thành content của Sanity nếu CHD thực sự muốn duy trì website lâu dài.

testimonial ko thông qua sanity, làm sao cho nó mặc định trong load server cũng được,

3. Tôi phát hiện một vấn đề UX quan trọng hơn lần trước

Homepage hiện đang:

Hero
↓
Why CHD
↓
Testimonials
↓
Featured Tours
↓
Day Tours
↓
Highland Tours
↓
Blog

Tôi thấy Testimonials đang hơi sớm.

Người dùng chưa biết CHD bán tour gì mà đã đọc review.

Tôi sẽ thử flow:

HERO
↓
WHY CHD
↓
FEATURED EXPERIENCE
↓
DAY TOURS
↓
MULTI-DAY TOURS
↓
TRAVELER STORIES
↓
JOURNAL
↓
CTA

Tức là:

Tell me who you are → show me what I can experience → prove that people loved it → give me a way to contact you.

## Conversion flow sẽ tự nhiên hơn.

6. Một thứ tôi muốn thêm ngay: Plan your trip

Đây là feature có ROI cao nhất hiện giờ.

Ở tour detail:

[ Book / Enquire ]

không nên là generic.

Nên:

PLAN THIS TRIP

click vào contact:

Tell us about your trip

I'm interested in:
[ Elephant & Coffee Day Tour ]

When are you travelling?
[ ]

How many people?
[ ]

Anything you'd like us to know?
[ ]

[ Send enquiry ]

Backend của bạn hiện đã có form + tags + email + client confirmation + Discord notification.

=> Infrastructure đã gần đủ.

Chỉ cần truyền:

selectedTour

vào form.

## Đây là feature tôi ưu tiên #1.

7. Có một bug/technical smell tôi muốn sửa

Trong server:

const [email_res] = await Promise.allSettled([
send_email(...),
sendClientConfirmation(...),
send_to_discord(...)
])

nhưng bạn chỉ kiểm tra:

email_res.status

Điều đó nghĩa là:

email CHD fail → báo failed
client confirmation fail → có thể vẫn báo success
Discord fail → vẫn success

Nếu intentional thì OK.

Nhưng tôi sẽ làm rõ semantics:

PRIMARY DELIVERY
└── email to CHD

SECONDARY
├── client confirmation
└── Discord notification

Nếu primary email thành công:

submission = success

Secondary fail thì log riêng.

## Cái này không ảnh hưởng UI nhiều nhưng nên clean.

8. Accessibility của testimonial cần sửa

Carousel hiện có:

aria-label="Previous testimonials"
aria-label="Next testimonials"

và region.

Tốt.

Nhưng tôi sẽ bổ sung:

aria-live phù hợp
keyboard interaction
pause auto-rotation khi focus vào carousel
dots có trạng thái accessible
prefers-reduced-motion

Đặc biệt:

auto carousel
accessibility nên có:
@media (prefers-reduced-motion: reduce)

# Không cần bỏ carousel; chỉ cần disable animation/auto-play cho người yêu cầu reduced motion.

9. Mobile: cần test thật, không chỉ responsive CSS

Đây là thứ tôi sẽ ưu tiên sau content.

Đặc biệt:

Hero

Không để:

huge image
huge title
CTA

chiếm toàn bộ màn hình mà user phải scroll mới thấy nội dung.

Testimonials

Hiện desktop:

[ review ] [ review ] [ review ]

mobile:

[ review ]
[ review ]

carousel implementation hiện tại về cơ bản hỗ trợ tốt, nhưng cần test touch/swipe thực tế.

Featured

# Đây là nơi tôi nghi ngờ nhất nếu có nhiều slider trên cùng homepage.

10. Animation: đừng thêm nữa

Tôi thấy branch đã có animation work trước đó, và testimonial mới cũng có transition carousel. Branch hiện tại đã có commit riêng cho testimonial animation/interaction.

Tôi sẽ freeze animation.

Không thêm:

parallax
scroll reveal everywhere
text split animation
image zoom everywhere
fancy page transition
cursor effect.

CHD nên có cảm giác:

quiet / slow / natural

chứ không phải:

# "Look how technically impressive this website is."

11. Tôi sẽ đổi thứ tự homepage

Nếu là tôi làm tiếp branch này, tôi sẽ target:

┌─────────────────────────────┐
│ HERO │
│ │
│ Go local. See local. │
│ Eat local. │
│ │
│ [ Explore tours ] │
└─────────────────────────────┘

            ↓

WHY CHD
Go local / See local / Eat local

            ↓

FEATURED EXPERIENCES
Coffee / Food / People / Nature

            ↓

DAY TOURS
3–4 best tours

            ↓

MULTI-DAY TOURS
2–3 best tours

            ↓

TRAVELER STORIES
3 reviews

            ↓

CHD JOURNAL
Places / Food / People / Stories

            ↓

PLAN YOUR TRIP
"Tell us what you want to experience."

            ↓

FOOTER

Tôi thấy flow này mạnh hơn homepage hiện tại.
