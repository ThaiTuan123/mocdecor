export interface Product {
    id: number;
    title: string;
    price: string;
    description: string; // Added if needed for your application
    category: string; // Added if needed for your application
    reviewCount: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    images: string[]; // Carousel images
}
