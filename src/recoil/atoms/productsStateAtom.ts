import { atom } from 'recoil';
import { Product } from '@/types/product';

export const productsState = atom<(Product[] | null)[]>({
  key: 'productsState',
  default: [],
});
