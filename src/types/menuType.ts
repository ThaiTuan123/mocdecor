// src/types.ts

export interface MenuType {
  _id: string;
  name: string;
  enName: string;
  description: string;
  image: string;
  subCategories: {
    _id: string;
    text: string;
    description: string;
    image: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface MenuOthersType {
  _id: string;
  text: string;
  description: string;
  image: string;
  slug: string;
  parentSlug: string;
}

export interface FetchMenuResponse {
  types: MenuType[];
  otherType: MenuOthersType[];
}
