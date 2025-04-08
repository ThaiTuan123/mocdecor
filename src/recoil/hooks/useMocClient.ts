// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchMocClient } from '@/services/api';
import { mocClientState } from '../atoms/mocClientAtom';
import { FetchMocClientResponse } from '@/types/mocClientType';

const useMocClient = (): {
  client: FetchMocClientResponse;
  loading: boolean;
} => {
  const [client, setClient] = useRecoilState(mocClientState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMocClient = async () => {
      setLoading(true);
      try {
        const data = await fetchMocClient();
        setClient(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };

    getMocClient();
  }, [setClient]);

  return { client, loading };
};

export default useMocClient;
