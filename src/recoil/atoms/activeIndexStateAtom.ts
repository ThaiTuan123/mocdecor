// src/atoms/activeIndexState.ts
import { atom } from 'recoil';

export const activeIndexState = atom<number>({
    key: 'activeIndexState',
    default: 0,
});
