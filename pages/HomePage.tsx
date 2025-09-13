
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import * as api from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 animate-pulse aspect-w-1 aspect-h-1 w-full"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mt-2"></div>
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
