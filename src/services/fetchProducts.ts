// src/services/fetchProducts.ts

import { Product } from '@/types/product';
import { API } from '@/utils/constants';
import languages from '@/configs/languages';

export const fetchProducts = async (
  params: { category?: string; subCategory?: string } = {}
): Promise<Product[]> => {
  const { category, subCategory } = params;
  const limit = 8;
  const page = 1;
  try {
    const url = new URL(
      `${API.POS_PRODUCT}/category/${category}/type/${subCategory}`
    );
    url.searchParams.append('limit', String(limit));
    url.searchParams.append('page', String(page));

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(languages.get('error.response.title.network'));
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
