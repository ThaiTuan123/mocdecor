// src/types/order.ts
export interface Order {
    id: number;
    imageSrc: string;
    title: string;
    selectedCount: number;
    totalCount: number;
    status: string;  // Change from "click" | "error" | "default" to string
}

export interface OrderList {
    orders: Order[];
}
