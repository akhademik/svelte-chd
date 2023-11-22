import day_tours from './category/day-tours'
import highland_tours from './category/highland-tours'
import tour_highlights from './category/tour-highlights'
import tour_includes from './category/tour-includes'
import tour_tags from './category/tour-tags'
import {locale_content, locale_slug, locale_string} from './common/type-locale'
import {content_block} from './common/type-others'
import {tour_price} from './common/type-tour'

export const schemaTypes = [
  //NOTE:helper definitions
  locale_slug,
  locale_string,
  locale_content,
  content_block,
  tour_price,

  //NOTE: main category
  day_tours,
  highland_tours,
  tour_highlights,
  tour_includes,
  tour_tags,
]
