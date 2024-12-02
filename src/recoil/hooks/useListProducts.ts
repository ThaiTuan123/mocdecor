import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import { fetchListProducts} from "@/services/api";
import { listProductState } from '../atoms/listProduct';

const useListProducts = (
  categorySlug: string
): { listProduct: any; loading: boolean } => {
  const [listProduct, setListProduct] = useRecoilState(listProductState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchListProducts(categorySlug);
        setListProduct(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    if (categorySlug) {
      getListProduct();
    }
  }, [categorySlug]);

  return { listProduct, loading };
};

export default useListProducts;
