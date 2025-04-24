// src/state/atoms.ts
import { FetchMocAboutResponse } from '@/types/mocAboutType';
import { atom } from 'recoil';
// src/types.ts

export const mocAboutState = atom<FetchMocAboutResponse>({
  key: 'mocAboutState',
  default: {
    data: {},
  },
});
