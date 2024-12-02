// src/types.ts

export interface CategoryType {
  _id?: string;
  name: string;
  enName: string;
  description?: string;
  image: string;
  subCategories?: {
    _id: string;
    id?: string;
    name?: string;
    text?: string;
    description: string;
    image: string;
    slug: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}

export interface ProductType {
  _id: string;
  id?: string;
  name?: string;
  text?: string;
  description: string;
  image: string;
  slug: string;
}

export interface FetchCategoriesResponse {
  count: number;
  items: CategoryType[];
}
