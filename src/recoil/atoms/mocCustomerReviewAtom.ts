// src/state/atoms.ts
import { FetchMocCustomerReviewResponse } from '@/types/mocCustomerReviewType';
import { atom } from 'recoil';
// src/types.ts

export const mocCustomerReviewState = atom<FetchMocCustomerReviewResponse>({
  key: 'mocCustomerReviewState',
  default: {
    data: [],
  },
});
