export type ProductCategory = 'eyeglass' | 'sunglass';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  description?: string;
  brand?: string;
  inStock?: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt?: Date;
}
