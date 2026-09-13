import {generate_field} from '../helper-functions'
import {img_cover, img_tour} from './type-img'
import {
  exchange_rates_ref,
  tour_highlights_ref,
  tour_includes_ref,
  tour_level_field,
  tour_tags_ref,
} from './type-tour'

export const BASE_FIELDS = [
  generate_field('Bán chạy', 'bestSellerTour', 'boolean', false),
  generate_field('Liên hệ để biết giá (không hiện bảng giá)', 'contactForPrice', 'boolean', false),
  generate_field('Tên tour', 'tourName', 'locale_string'),
  generate_field('Thời gian tour', 'tourDuration', 'locale_string'),
  tour_level_field,
  img_cover,
  img_tour,
  generate_field('Giới thiệu tour', 'tourIntro', 'locale_content'),
  tour_highlights_ref,
  tour_includes_ref,
  tour_tags_ref,
  generate_field('Lịch trình chi tiết', 'tourItinerary', 'locale_content'),
  generate_field('Giá tour', 'tourPrice', 'tour_price'),
  exchange_rates_ref,
]
