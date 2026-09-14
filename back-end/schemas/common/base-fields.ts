import {generateField} from '../helper-functions'
import {img_cover, img_tour} from './type-img'
import {
  exchange_rates_ref,
  tour_good_to_know,
  tour_highlights_ref,
  tour_includes_ref,
  tour_tags_ref,
} from './type-tour'

export const BASE_FIELDS = [
  generateField('Bán chạy', 'bestSellerTour', 'boolean', false),
  generateField('Liên hệ để biết giá (không hiện bảng giá)', 'contactForPrice', 'boolean', false),
  generateField('Tên tour', 'tourName', 'locale_string'),
  generateField('Thời gian tour', 'tourDuration', 'locale_string'),
  img_cover,
  img_tour,
  generateField('Giới thiệu tour', 'tourIntro', 'locale_content'),
  tour_highlights_ref,
  tour_includes_ref,
  tour_tags_ref,
  tour_good_to_know,
  generateField('Lịch trình chi tiết', 'tourItinerary', 'locale_content'),
  generateField('Giá tour', 'tourPrice', 'tour_price'),
  exchange_rates_ref,
]
