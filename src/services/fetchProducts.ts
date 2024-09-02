// src/services/fetchProducts.ts

import {Product} from "@/types/product";
import {API_PRODUCT} from "@/utils/constants";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_PRODUCT}/products?limit=6`);
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
