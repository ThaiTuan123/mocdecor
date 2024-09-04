// src/services/fetchProducts.ts

import {Product} from "@/types/product";
import {API_PRODUCT} from "@/utils/constants";

export const fetchProducts = async (params: { limit?: number; page?: number } = {}): Promise<Product[]> => {
    const {limit = 6, page = 1} = params; // Default limit is 6 and page is 1
    try {
        const url = new URL(`${API_PRODUCT}/products`);
        url.searchParams.append("limit", String(limit));
        url.searchParams.append("page", String(page));

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
        return data; // Adjust this if the structure of the response is different
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
