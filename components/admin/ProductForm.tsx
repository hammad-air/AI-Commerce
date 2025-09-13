
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [images, setImages] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price.toString());
      setInventory(product.inventory.toString());
      setImages(product.images.join(', '));
    } else {
        setTitle('');
        setDescription('');
        setPrice('');
        setInventory('');
        setImages('');
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price: parseFloat(price),
      inventory: parseInt(inventory, 10),
      images: images.split(',').map(img => img.trim()).filter(Boolean),
    };
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
                <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">Inventory</label>
                <input type="number" id="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
        </div>
        <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
            <input type="text" id="images" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Enter image URLs, separated by commas" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            <p className="mt-2 text-sm text-gray-500">Separate multiple image URLs with a comma.</p>
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
        </div>
    </form>
  );
};

export default ProductForm;
