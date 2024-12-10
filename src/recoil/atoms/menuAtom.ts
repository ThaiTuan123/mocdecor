// src/state/atoms.ts
import { FetchMenuResponse } from '@/types/menuType';
import { atom } from 'recoil';
// src/types.ts

export const menuState = atom<FetchMenuResponse>({
  key: 'menuState',
  default: {
    types: [],
    otherType: [],
  },
});
