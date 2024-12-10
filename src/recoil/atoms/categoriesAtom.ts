// src/state/atoms.ts
import { atom } from 'recoil';
import { CategoryType } from '@/types/categoryType';

export const categoriesState = atom<CategoryType[]>({
  key: 'categoriesState',
  default: [],
});
