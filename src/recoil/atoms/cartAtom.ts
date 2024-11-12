import { CartItem } from '@/types/cartType';
import { atom } from 'recoil';

export const cartState = atom<CartItem[]>({
  key: 'cartState', 
  default: [], 
});