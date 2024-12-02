// src/state/atoms.ts
import { atom } from "recoil";

export const categoryDetailState = atom({
  key: "categoryDetailState",
  default: {
    name: "",
    enName: "",
    image: "",
    slug: "",
    subCategories: [],
  },
});
