// src/state/atoms.ts
import { FetchTopPosProductCategoryResponse } from '@/types/topCategory';
import { atom } from 'recoil';

export const topPosProductCategoryState =
  atom<FetchTopPosProductCategoryResponse>({
    key: 'topPosProductCategoryState',
    default: {
      category: [],
    },
  });
