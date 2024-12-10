// src/hooks/useCategories.ts
import { useRecoilState } from 'recoil';
import { fetchProductCategories } from '@/services/api';
import { useEffect } from 'react';
import { categoriesState } from '@/recoil/atoms/categoriesAtom';
import { categoryErrorState } from '@/recoil/atoms/categoryErrorAtom';

const useCategories = (categoryNames: string[]) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [, setError] = useRecoilState(categoryErrorState); // Accessing the error atom

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length === 0) {
        // Only fetch if not already loaded
        try {
          const results = await Promise.all(
            categoryNames.map(async name => {
              const response = await fetchProductCategories(name);
              return response;
            })
          );

          const combinedResults = results.flatMap(res =>
            res && res.items ? res.items : []
          );

          setCategories(combinedResults);
        } catch (err) {
          console.error('Error fetching categories:', err);
          setError(
            err instanceof Error ? err : new Error('Unknown error occurred')
          );
        }
      }
    };

    fetchCategories();
  }, [categoryNames, categories, setCategories, setError]);

  return { categories };
};

export default useCategories;
