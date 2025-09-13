
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  inventory: number;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string | null;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  customerName: string;
  customerEmail: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
}
