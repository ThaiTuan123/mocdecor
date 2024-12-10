import { atom } from 'recoil';

export const loadedState = atom<boolean[]>({
  key: 'loadedState',
  default: [],
});
