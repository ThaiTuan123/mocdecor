import { useState, useEffect } from 'react';
import {fetchProductCategories} from "@/services/api";
import {CategoryType} from "@/types/categoryType";

const useFetchCategories = (categoryNames: string[]) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const results = await Promise.all(
                    categoryNames.map(async (name) => {
                        const response = await fetchProductCategories(name);
                        return response;
                    })
                );

                const combinedResults = results.flatMap((res) =>
                    res && res.items ? res.items : []
                );

                setCategories(combinedResults);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError(err instanceof Error ? err : new Error("Unknown error occurred"));
            }
        };

        fetchCategories();
    }, [categoryNames]);

    return { categories, error };
};

export default useFetchCategories;