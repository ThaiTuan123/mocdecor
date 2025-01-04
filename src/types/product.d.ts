export interface Product {
  //   product_id: number;
  //   title: string;
  //   description: string; // Added if needed for your application
  //   category: string; // Added if needed for your application
  reviewCount: number;
  rating: {
    rating: number;
    count: number;
  };
  //   images: string[]; // Carousel images

  display_id: string;
  fields: Array<{
    id: string;
    keyValue: string;
    name: string;
    value: string;
  }>;
  images: string[];
  product: {
    categories: Array<{
      id: number;
      name: string;
    }>;
    displayId: string;
    image: string;
    name: string;
    noteProduct: string;
  };
  product_id: string;
  retail_price: number;
}
