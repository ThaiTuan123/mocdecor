import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchListProducts } from '@/services/api';
import { listProductState } from '../atoms/listProduct';

const useListProducts = (
  param: any
): { listProduct: any; loading: boolean } => {
  const [listProduct, setListProduct] = useRecoilState(listProductState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchListProducts(param);
        setListProduct(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    if (param) {
      getListProduct();
    }
  }, [param.categorySlug]);

  return { listProduct, loading };
};

export default useListProducts;
