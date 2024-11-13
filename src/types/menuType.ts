// src/types.ts

export interface MenuType {
  _id: string;
  name: string;
  enName: string;
  description: string;
  image: string;
  types: {
    _id: string;
    name: string;
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
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface FetchMenuResponse {
  menu: MenuType[];
  otherType: MenuOthersType[];
}
