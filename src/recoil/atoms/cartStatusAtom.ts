// recoil/cartStatusAtom.ts
import { atom } from 'recoil';

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export const successState = atom<boolean>({
  key: 'successState',
  default: false,
});

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});
