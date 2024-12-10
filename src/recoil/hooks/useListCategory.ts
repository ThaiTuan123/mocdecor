// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchListCategory } from '@/services/api';
import { listCategoryState } from '../atoms/listCategory';
import { CategoryType } from '@/types/categoryType';

const useListCategory = (): {
  listCategory: CategoryType[];
  loading: boolean;
} => {
  const [listCategory, setListCategory] = useRecoilState(listCategoryState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListCategory = async () => {
      setLoading(true);
      try {
        const data = await fetchListCategory();
        setListCategory(data.items);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    getListCategory();
  }, [setListCategory]);

  return { listCategory, loading };
};

export default useListCategory;
