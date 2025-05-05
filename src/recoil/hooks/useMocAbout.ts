// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchMocAbout } from '@/services/api';
import { mocAboutState } from '../atoms/mocAboutAtom';
import { FetchMocAboutResponse } from '@/types/mocAboutType';

const useMocAbout = (): {
  data: FetchMocAboutResponse;
  loading: boolean;
} => {
  const [mocAbout, setMocAbout] = useRecoilState(mocAboutState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMocAbout = async () => {
      setLoading(true);
      try {
        const data = await fetchMocAbout();
        setMocAbout({ data });
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };

    getMocAbout();
  }, [setMocAbout]);

  return { data: mocAbout, loading };
};

export default useMocAbout;
