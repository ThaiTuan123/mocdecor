import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CategoryType } from '@/types/categoryType';
import { fetchProductCategories } from '@/services/api';
import { categoriesState } from '@/recoil/atoms/categoriesAtom';

const useProductCategories = (
  name: string
): { productCategories: CategoryType[]; loading: boolean } => {
  const [productCategories, setProductCategories] =
    useRecoilState(categoriesState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchProductCategories(name);
        setProductCategories(data.items);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [name, setProductCategories]);

  return { productCategories, loading };
};

export default useProductCategories;
