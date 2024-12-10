// src/recoil/atoms/categoryErrorAtom.ts
import { atom } from 'recoil';

export const categoryErrorState = atom<Error | null>({
  key: 'categoryErrorState', // Unique key for this atom
  default: null, // Default state is null, meaning no error
});
