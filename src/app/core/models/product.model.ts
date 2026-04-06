export type ProductCategory = 'eyeglass' | 'sunglass';

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: any;
}

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
  read?: boolean;
  createdAt?: any;
}
