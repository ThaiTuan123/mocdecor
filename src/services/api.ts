// src/services/api.ts
import {FetchCategoriesResponse} from "@/types/categoryType";
import {BASE_URL} from "@/utils/constants";
import languages from "@/configs/languages";

export const fetchCategories = async (
    name: string,
    limit: number = 6,
    page: number = 1
): Promise<FetchCategoriesResponse> => {
    const response = await fetch(`${BASE_URL}product-management/category?limit=${limit}&page=${page}&orderBy=_id&sort=desc&name=${encodeURIComponent(name)}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(languages.get('error.response.title.network ') + errorText);
    }
    return response.json();
};
