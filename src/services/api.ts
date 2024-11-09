// src/services/api.ts
import {FetchCategoriesResponse} from "@/types/categoryType";
import {API, BASE_URL} from "@/utils/constants";

import languages from "@/configs/languages";
import {ContactFormModel} from "@/types/ContactFormModel";

interface RequestOptions {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
}

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(languages.get('error.response.title.network ') + errorText);
    }
    return response.json();
};

const apiRequest = async (url: string, options: RequestOptions = {}) => {
    const {method = 'GET', body = null, headers = {'Content-Type': 'application/json'}} = options;

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse(response);
};

// Fetch categories with search parameters
export const fetchCategories = async (
    name: string,
    limit: number = 6,
    page: number = 1
): Promise<FetchCategoriesResponse> => {
    const url = `${BASE_URL}/product-management/category?limit=${limit}&page=${page}&orderBy=_id&sort=desc&name=${encodeURIComponent(name)}`;
    return apiRequest(url);
};

// Fetch a list of categories
export const fetchListCategory = async (limit: number = 20, page: number = 1) => {
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

export const fetchProductCategories = async (name: string, limit: number = 20, page: number = 1) => {
    const url = `${API.PRODUCT_CATEGORIES}?limit=${limit}&page=${page}&name=${name}`;
    return apiRequest(url);
}

//products
export const fetchListProducts = async (categorySlug: string, slug: string) => {
    const url = `${API.LIST_PRODUCT}/${slug}/category/${categorySlug}`;
    return apiRequest(url);
}
