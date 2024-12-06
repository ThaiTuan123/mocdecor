// src/atoms/productAtom.ts
import { atom } from 'recoil';
import { Product } from '@/types/product';

export const productState = atom<Product[]>({
    key: 'productState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const selectedProductState = atom<Product | null>({
    key: 'selectedProductState', // unique ID for selected product
    default: null, // default value is null when no product is selected
});
