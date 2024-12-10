// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchTopProductCategory } from '@/services/api';
import { FetchTopPosProductCategoryResponse } from '@/types/topCategory';
import { topPosProductCategoryState } from '../atoms/topPosProductCategory';

const useTopPosProductCategory = (): {
  topPosProductCategory: FetchTopPosProductCategoryResponse;
  loading: boolean;
} => {
  const [topPosProductCategory, setTopPosProductCategory] = useRecoilState(
    topPosProductCategoryState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopPosProductCategory = async () => {
      setLoading(true);
      try {
        const data = await fetchTopProductCategory();
        setTopPosProductCategory({ category: data });
      } catch (error) {
        console.error('Failed to fetch top pos product category:', error);
      } finally {
        setLoading(false);
      }
    };

    getTopPosProductCategory();
  }, [setTopPosProductCategory]);

  return { topPosProductCategory, loading };
};

export default useTopPosProductCategory;
