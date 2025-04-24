// src/state/atoms.ts
import { FetchMocEventResponse } from '@/types/mocEventType';
import { atom } from 'recoil';
// src/types.ts

export const mocEventState = atom<FetchMocEventResponse>({
  key: 'mocEventState',
  default: {
    data: {},
  },
});
