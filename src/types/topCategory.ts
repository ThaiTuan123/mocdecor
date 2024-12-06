// src/types.ts

export interface PosProductCategory {
  _id: string;
  name: string;
  enName: string;
  description: string;
  image: string;
  banner: string;
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

export interface PosProductSubCategories {
  _id: string;
  text: string;
  description: string;
  image: string;
  slug: string;
  parentSlug: string;
}

export interface FetchTopPosProductCategoryResponse {
  category: PosProductCategory[];
}
