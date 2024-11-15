import {atom} from "recoil";

export const errorUrlsState = atom<{ [key: number]: boolean }>({
    key: 'errorUrlsState',
    default: {},
});