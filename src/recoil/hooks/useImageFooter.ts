// src/hooks/useCategories.ts
import { FetchImageFooterResponse } from '@/types/footerImage';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageFooterState } from '../atoms/imageFooterAtom';
import { fetchMocFooter } from '@/services/api';

const useImageFooter = (): {
  data: FetchImageFooterResponse;
  loading: boolean;
} => {
  const [data, setData] = useRecoilState(imageFooterState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImageFooter = async () => {
      setLoading(true);
      try {
        const data = await fetchMocFooter();
        setData({ data });
      } catch (error) {
        console.error('Failed to fetch footer:', error);
      } finally {
        setLoading(false);
      }
    };

    getImageFooter();
  }, [setData]);

  return { data, loading };
};

export default useImageFooter;
