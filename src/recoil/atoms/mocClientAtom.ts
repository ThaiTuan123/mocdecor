// src/state/atoms.ts
import { FetchMocClientResponse } from '@/types/mocClientType';
import { atom } from 'recoil';
// src/types.ts

export const mocClientState = atom<FetchMocClientResponse>({
  key: 'mocClientState',
  default: {
    data: [],
  },
});
