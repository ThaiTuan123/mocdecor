// src/types.ts

export interface CategoryType {
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
}

export interface FetchCategoriesResponse {
    count: number;
    items: CategoryType[];
}
