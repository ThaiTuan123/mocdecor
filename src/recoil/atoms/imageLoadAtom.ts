import { atom } from 'recoil';

// Atom to manage the image loading state
export const isImageLoadedState = atom<boolean>({
    key: 'isImageLoadedState',
    default: false,
});
