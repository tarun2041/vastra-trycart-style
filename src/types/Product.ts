export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  vendor: {
    id: string;
    name: string;
  };
  offers?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}