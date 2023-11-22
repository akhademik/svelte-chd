import {generate_field} from '../helper-functions'
import {img_cover, img_tour} from './type-img'
import {tour_highlights_ref, tour_includes_ref, tour_slug, tour_tags_ref} from './type-tour'

export const BASE_FIELDS = [
  generate_field('Bán chạy', 'best_sell', 'boolean', false),
  generate_field('Tên tour', 'tour_name', 'locale_string'),
  generate_field('Thời gian tour', 'tour_duration', 'locale_string'),
  img_cover,
  img_tour,
  tour_slug,
  generate_field('Giới thiệu tour', 'tour_intro', 'locale_content'),
  tour_highlights_ref,
  tour_includes_ref,
  tour_tags_ref,
  generate_field('Lịch trình chi tiết', 'tour_itinerary', 'locale_content'),
  generate_field('Giá tour', 'tour_price', 'tour_price'),
]
