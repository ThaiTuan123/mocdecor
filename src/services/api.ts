// src/services/api.ts
import { FetchCategoriesResponse } from '@/types/categoryType';
import { API, BASE_URL } from '@/utils/constants';

import languages from '@/configs/languages';
import { ContactFormModel } from '@/types/ContactFormModel';

interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(languages.get('error.response.title.network') + errorText);
  }
  return response.json();
};

const apiRequest = async (url: string, options: RequestOptions = {}) => {
  const {
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
  } = options;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'force-cache',
  });

  return handleResponse(response);
};

// Fetch categories with search parameters
export const fetchCategories = async (
  name: string,
  limit: number = 6,
  page: number = 1
): Promise<FetchCategoriesResponse> => {
  const url = `${BASE_URL}/product-management/category?limit=${limit}&page=${page}&orderBy=_id&sort=desc&name=${encodeURIComponent(
    name
  )}`;
  return apiRequest(url);
};

// Fetch menu
export const fetchMenu = async () => {
  const url = `${API.MENU}`;
  return apiRequest(url);
};

// Fetch top pos product category
export const fetchTopProductCategory = async () => {
  const url = `${API.TOP_POS_PRODUCT_CATEGORY}`;
  return apiRequest(url);
};

// Fetch a list of categories
export const fetchListCategory = async (
  limit: number = 20,
  page: number = 1
) => {
  const url = `${API.PRODUCT_CATEGORIES}?limit=${limit}&page=${page}`;
  return apiRequest(url);
};

// Fetch banner items
export const fetchBannerItems = async () => {
  const url = 'https://api.mocdecor.org/public/settings/banner';
  return apiRequest(url);
};

// Submit contact form
export const submitContactForm = async (formData: ContactFormModel) => {
  const url = 'https://api.mocdecor.org/public/contact/submit';
  return apiRequest(url, {
    method: 'POST',
    body: formData,
  });
};

export const fetchProductCategories = async (
  name: string,
  limit: number = 20,
  page: number = 1
) => {
  const url = `${API.PRODUCT_CATEGORIES}?limit=${limit}&page=${page}&name=${name}`;
  return apiRequest(url);
};

// Fetch product types by category
export const fetchProductTypeByCategory = async (slug: string) => {
  const url = `${API.PRODUCT_TYPES_BY_CATEGORIES}${slug}`;
  return apiRequest(url);
};

//products
export const fetchListProducts = async (param: any) => {
  const {
    categorySlug,
    typeIds,
    limit = 20,
    page = 1,
    price = 0,
    sortBy = 'desc',
  } = param;
  let url = '';
  if (typeIds && typeIds.length > 0) {
    url = `${API.LIST_PRODUCT}/category/${categorySlug}?limit=${limit}&page=${page}&orderBy=_id&sortBy=${sortBy}&typeIds=${typeIds}&price=${price}`;
  } else {
    url = `${API.LIST_PRODUCT}/category/${categorySlug}?limit=${limit}&page=${page}&orderBy=_id&sortBy=${sortBy}&price=${price}`;
  }
  return apiRequest(url);
};

//cart
export const fetchCart = async (browserId: string) => {
  const url = `${API.CART}/${browserId}`;
  return apiRequest(url);
};

//update cart
export const updateCart = async (browserId: string, body: any) => {
  const url = `${API.CART}/${browserId}/update`;
  return apiRequest(url, {
    method: 'POST',
    body: body,
  });
};

//add cart
export const addCart = async (browserId: string, body: any) => {
  const url = `${API.CART}/${browserId}/add`;
  return apiRequest(url, {
    method: 'POST',
    body: body,
  });
};

//remove cart
export const removeCart = async (browserId: string, body: any) => {
  const url = `${API.CART}/${browserId}/remove`;
  return apiRequest(url, {
    method: 'POST',
    body: body,
  });
};

//submit payment
export const submitPayment = async (browserId: string, body: any) => {
  const url = `${API.PAYMENT}/${browserId}`;
  return apiRequest(url, {
    method: 'POST',
    body: body,
  });
};

//get order
export const getOrder = async (orderId: string) => {
  const url = `${API.POS_ORDER}/${orderId}`;
  return apiRequest(url);
};

//get product detail
export const getProduct = async (productId: string) => {
  const url = `${API.POS_PRODUCT}/detail/${productId}`;
  return apiRequest(url);
};

export const uploadSingle = async (body: any) => {
  const url = API.UPLOAD_IMAGE;
  return apiRequest(url, {
    method: 'POST',
    body: body,
  });
};

export const fetchBlogs = async () => {
  const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error('API Key is not defined');
  }

  const response = await fetch('https://mocdecor.microcms.io/api/v1/blogs', {
    headers: { 'X-MICROCMS-API-KEY': apiKey },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  return response.json();
};
