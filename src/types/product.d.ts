// types/types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

export interface ProductsList {
  products: Product[];
}