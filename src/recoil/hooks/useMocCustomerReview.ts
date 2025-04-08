// src/hooks/useCategories.ts
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchMocCustomerReview } from '@/services/api';
import { FetchMocCustomerReviewResponse } from '@/types/mocCustomerReviewType';
import { mocCustomerReviewState } from '../atoms/mocCustomerReviewAtom';

const useMocCustomerReview = (): {
  reviews: FetchMocCustomerReviewResponse;
  loading: boolean;
} => {
  const [reviews, setReviews] = useRecoilState(mocCustomerReviewState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMocCustomerReview = async () => {
      setLoading(true);
      try {
        const data = await fetchMocCustomerReview();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch customer reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    getMocCustomerReview();
  }, [setReviews]);

  return { reviews, loading };
};

export default useMocCustomerReview;
