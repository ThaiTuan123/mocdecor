// src/services/fetchProducts.ts

import {Product} from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('/json/products-print.json');
        const data = await response.json();
        console.log('Fetched Data:', data);
        return data.items;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
