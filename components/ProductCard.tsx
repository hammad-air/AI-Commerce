
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
           <Link to={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-grow">{product.description}</p>
        <p className="mt-4 text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
