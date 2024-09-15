// src/hooks/useCategories.ts
import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {CategoryType} from "@/types/categoryType";
import {fetchCategories} from "@/services/api";
import {categoriesState} from "@/recoil/atoms/categoriesAtom";

const useCategories = (name: string): { categories: CategoryType[]; loading: boolean } => {
    const [categories, setCategories] = useRecoilState(categoriesState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const data = await fetchCategories(name);
                setCategories(data.items);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, [name, setCategories]);

    return {categories, loading};
};

export default useCategories;