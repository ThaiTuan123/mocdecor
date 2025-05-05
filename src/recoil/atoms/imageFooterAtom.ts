// src/state/atoms.ts
import { FetchImageFooterResponse } from '@/types/footerImage';
import { atom } from 'recoil';
// src/types.ts

export const imageFooterState = atom<FetchImageFooterResponse>({
  key: 'imageFooterState',
  default: {
    data: {},
  },
});
