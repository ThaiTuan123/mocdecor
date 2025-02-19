// recoil/atoms.ts
import { atom } from 'recoil';

export const formattedTextAtom = atom<string>({
  key: 'formattedText', // unique ID
  default: '', // initial state
});
