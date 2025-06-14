// utils/constants.ts

//API
// export const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
export const BASE_URL = process.env.BASE_URL || 'https://api.mocdecor99.com';
export const BASE_CDN_URL =
  process.env.BASE_CDN_URL || 'https://cdn.mocdecor99.com';

export const SCROLL_AMOUNT = 300; // Amount to scroll each interval
export const REPEAT_INTERVAL = 5000; // Default scroll interval in milliseconds
export const ARROW_RIGHT = '→'; // Default scroll interval in milliseconds
export const TITLE_MAX_LENGTH = 54; // Default scroll interval in milliseconds

export const INTERACTIVE_ELEMENTS = [
  'BUTTON',
  'A',
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'P',
  'SVG',
  'H2',
  'SPAN',
  'IMG',
];

// Regex for validating Vietnamese phone numbers
export const VIETNAM_PHONE_REGEX =
  /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

//Youtube
export const YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed/';

//Fake API products
export const API_PRODUCT =
  process.env.FAKE_API_PRODUCT || 'https://fakestoreapi.com';

// Payment Link
export const PAYMENT_LINK = 'https://pke.gg/y304xv9z';

export class API {
  static PRODUCT_CATEGORIES = BASE_URL + '/public/product-management/category';
  static LIST_PRODUCT = BASE_URL + '/public/pos-products';
  static CART = BASE_URL + '/cart';
  static PAYMENT = BASE_URL + '/cart/buy';
  static MENU = BASE_URL + '/public/pos-product-categories/menu';
  static PRODUCT_TYPES_BY_CATEGORIES =
    BASE_URL + '/public/pos-product-categories/';
  static TOP_POS_PRODUCT_CATEGORY =
    BASE_URL + '/public/pos-product-categories/top';
  static POS_PRODUCT = BASE_URL + '/public/pos-products';
  static POS_ORDER = BASE_URL + '/pos-orders';
  static UPLOAD_IMAGE = BASE_URL + '/single';
  static MOC_CLIENT = BASE_URL + '/public/settings/clients'; // Đối tác của Mộc
  static MOC_CUSTOMER_REVIEW = BASE_URL + '/public/settings/reviews'; // Đánh giá của khách hàng
  static MOC_ABOUT = BASE_URL + '/public/settings/about'; // Về Mộc
  static MOC_EVENT = BASE_URL + '/public/settings/event'; // Banner sự kiện
  static MOC_FOOTER = BASE_URL + '/public/settings/footer'; // Ảnh footer
  static CONTACT = BASE_URL + '/public/contact/submit'; // Đánh giá của khách hàng
  static BANNER = BASE_URL + '/public/settings/banner'; // Đánh giá của khách hàng
}
