// utils/constants.ts

//API
export const BASE_URL = 'https://api.mocdecor.org'

export const SCROLL_AMOUNT = 300 // Amount to scroll each interval
export const REPEAT_INTERVAL = 5000 // Default scroll interval in milliseconds
export const ARROW_RIGHT = '→' // Default scroll interval in milliseconds
export const TITLE_MAX_LENGTH = 54 // Default scroll interval in milliseconds

//Youtube
export const YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed/'

//Fake API products
export const API_PRODUCT = 'https://fakestoreapi.com'

export class API {
  static PRODUCT_CATEGORIES = BASE_URL + '/public/product-management/category'
  static LIST_PRODUCT = BASE_URL + '/public/pos-products'
  static CART = BASE_URL + '/cart'
  static MENU = BASE_URL + '/public/pos-product-categories/menu'
  static PRODUCT_TYPES_BY_CATEGORIES =
    BASE_URL + '/public/pos-product-categories/'
  static TOP_POS_PRODUCT_CATEGORY =
    BASE_URL + '/public/pos-product-categories/top'
  static POS_PRODUCT = BASE_URL + '/public/pos-products'
}
