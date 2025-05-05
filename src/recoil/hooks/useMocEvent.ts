// src/hooks/useMocEvent.ts
import { FetchMocEventResponse } from '@/types/mocEventType';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mocEventState } from '../atoms/mocEventAtom';
import { fetchMocEvent } from '@/services/api';

const useMocEvent = (): {
  data: FetchMocEventResponse;
  loading: boolean;
} => {
  const [event, setEvent] = useRecoilState(mocEventState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMocEvent = async () => {
      setLoading(true);
      try {
        const data = await fetchMocEvent();
        setEvent({ data });
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };

    getMocEvent();
  }, [setEvent]);

  return { data: event, loading };
};

export default useMocEvent;
