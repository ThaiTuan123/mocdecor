// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchProductTypeByCategory } from '@/services/api';
import { CategoryType } from '@/types/categoryType';
import { categoryDetailState } from '../atoms/categoryDetail';

const useCategoryDetail = (
  slug: string
): { cateDetail: CategoryType; loading: boolean } => {
  const [cateDetail, setCategoryDetail] = useRecoilState(categoryDetailState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetailCategory = async () => {
      setLoading(true);
      try {
        const data = await fetchProductTypeByCategory(slug);
        setCategoryDetail(data);
      } catch (error) {
        console.error('Failed to fetch type:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getDetailCategory(); // Fetch data only when slug changes
    }
  }, [slug]);

  return { cateDetail, loading };
};
export default useCategoryDetail;
