import { EXTRACT_BLOG_FIELDS } from './sanity/queries/blogs'
import { EXTRACT_TOUR_FIELDS } from './sanity/queries/tours'

export { EXTRACT_BLOG_FIELDS, EXTRACT_TOUR_FIELDS }
export { sanityClient } from './sanity/client'

// Re-exports for clean modular access and backward compatibility
export { cachedFetch } from './cache/memory-cache'
export { withKvSnapshot } from './cache/kv-snapshot'
export { TourService, type TourType } from './services/tour.service'
export { BlogService } from './services/blog.service'
export { ExchangeService, type ExchangeRatesData } from './services/exchange.service'

// Legacy aliases for non-breaking transitions
import { TourService } from './services/tour.service'
import { BlogService } from './services/blog.service'
import { ExchangeService } from './services/exchange.service'

export const fetchToursByType = TourService.getToursByType
export const fetchSingleTourBySlug = TourService.getTourBySlug
export const fetchFeaturedBlogs = BlogService.getFeaturedBlogs
export const fetchAllBlogs = BlogService.getAllBlogs
export const fetchLatestExchangeRates = ExchangeService.getLatestRates
