Điểm tôi muốn lưu ý là:

"60/60 pass" không đồng nghĩa với "logic quan trọng đã được test đầy đủ".

Hero là ví dụ rất rõ.

Hiện test tốt cho:

pure functions

nhưng chưa mạnh ở:

browser lifecycle
hydration
visibilitychange
pageshow
Cloudflare stale HTML

Tôi sẽ ưu tiên bổ sung những test này hơn là tăng số lượng unit test đơn thuần.
