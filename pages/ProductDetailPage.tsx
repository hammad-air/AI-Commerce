
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import * as api from '../services/api';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon } from '../components/icons/Icons';


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          navigate('/404'); // Or a 'not found' page
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="w-full aspect-square bg-gray-200 rounded-lg"></div>
                    <div className="flex mt-4 space-x-2">
                        <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                        <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden mb-4 border">
            <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-center object-cover" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button key={index} onClick={() => setActiveImage(index)} className={`w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-indigo-500' : 'border-transparent'}`}>
                <img src={image} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-center object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{product.title}</h1>
          <p className="text-3xl text-gray-900 mt-3">${product.price.toFixed(2)}</p>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700 space-y-6">{product.description}</p>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col justify-end">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="font-medium text-gray-700">Quantity:</label>
               <div className="flex items-center border border-gray-300 rounded-md">
                   <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md"><MinusIcon className="h-5 w-5" /></button>
                   <span className="px-4 py-1.5 text-lg font-semibold">{quantity}</span>
                   <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md"><PlusIcon className="h-5 w-5" /></button>
               </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
