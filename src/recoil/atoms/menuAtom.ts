// src/state/atoms.ts
import { FetchMenuResponse, MenuType } from "@/types/menuType";
import { atom } from "recoil";
// src/types.ts

export const menuState = atom<FetchMenuResponse>({
  key: "menuState",
  default: {
    types: [],
    otherType: [],
  },
});
