
import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'Modern Ergonomic Chair',
    description: 'A stylish and comfortable chair designed for long hours of work. Features adjustable height, lumbar support, and breathable mesh back.',
    price: 350.00,
    images: ['https://picsum.photos/seed/chair1/800/600', 'https://picsum.photos/seed/chair2/800/600'],
    inventory: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_2',
    title: 'Minimalist Oak Desk',
    description: 'Clean lines and solid oak construction make this desk a perfect centerpiece for any home office. Ample surface area for all your devices.',
    price: 750.00,
    images: ['https://picsum.photos/seed/desk1/800/600', 'https://picsum.photos/seed/desk2/800/600'],
    inventory: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_3',
    title: 'Wireless Mechanical Keyboard',
    description: 'Experience satisfying tactile feedback with this premium mechanical keyboard. Features customizable RGB backlighting and multi-device Bluetooth connectivity.',
    price: 180.00,
    images: ['https://picsum.photos/seed/keyboard1/800/600', 'https://picsum.photos/seed/keyboard2/800/600'],
    inventory: 50,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_4',
    title: '4K Ultra-Wide Monitor',
    description: 'Immerse yourself in stunning detail with this 34-inch ultra-wide monitor. Perfect for gaming, content creation, and multitasking.',
    price: 900.00,
    images: ['https://picsum.photos/seed/monitor1/800/600', 'https://picsum.photos/seed/monitor2/800/600'],
    inventory: 15,
    createdAt: new Date().toISOString(),
  },
   {
    id: 'prod_5',
    title: 'Smart LED Desk Lamp',
    description: 'Adjustable color temperature and brightness to suit any mood or task. Integrates with smart home assistants for voice control.',
    price: 89.99,
    images: ['https://picsum.photos/seed/lamp1/800/600', 'https://picsum.photos/seed/lamp2/800/600'],
    inventory: 100,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_6',
    title: 'Noise-Cancelling Headphones',
    description: 'Find your focus with industry-leading noise cancellation technology. Delivers premium sound quality and all-day comfort.',
    price: 399.00,
    images: ['https://picsum.photos/seed/headphones1/800/600', 'https://picsum.photos/seed/headphones2/800/600'],
    inventory: 40,
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord_1',
        userId: 'user_1',
        items: [
            {...MOCK_PRODUCTS[0], quantity: 1},
            {...MOCK_PRODUCTS[2], quantity: 1},
        ],
        total: 530.00,
        status: 'Delivered',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        customerName: 'Jane Doe',
        customerEmail: 'jane.doe@example.com',
    },
    {
        id: 'ord_2',
        userId: 'user_2',
        items: [
            {...MOCK_PRODUCTS[3], quantity: 1},
        ],
        total: 900.00,
        status: 'Shipped',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
    },
     {
        id: 'ord_3',
        userId: 'user_1',
        items: [
            {...MOCK_PRODUCTS[1], quantity: 1},
        ],
        total: 750.00,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        customerName: 'Jane Doe',
        customerEmail: 'jane.doe@example.com',
    }
];
