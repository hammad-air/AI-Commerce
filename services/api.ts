
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../constants';
import { Product, Order, CartItem } from '../types';

let products: Product[] = [...MOCK_PRODUCTS];
let orders: Order[] = [...MOCK_ORDERS];

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Product API
export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay(500);
  return [...products];
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await simulateDelay(300);
  return products.find(p => p.id === id);
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  await simulateDelay(700);
  const newProduct: Product = {
    ...productData,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  await simulateDelay(700);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updates };
    return products[productIndex];
  }
  return undefined;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  await simulateDelay(1000);
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  return products.length < initialLength;
};

// Order API
export const getOrders = async (): Promise<Order[]> => {
  await simulateDelay(500);
  return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createOrder = async (orderData: {
  userId: string | null;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
}): Promise<Order> => {
    await simulateDelay(1500);
    const newOrder: Order = {
        ...orderData,
        id: `ord_${Date.now()}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    return newOrder;
};
