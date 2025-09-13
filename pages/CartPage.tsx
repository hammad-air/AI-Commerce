
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '../components/icons/Icons';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Shopping Cart ({cartCount})</h1>
        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {cartItems.map(item => (
            <li key={item.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover object-center" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link to={`/products/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                   <div className="flex items-center border border-gray-300 rounded-md">
                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-l-md"><MinusIcon className="h-5 w-5" /></button>
                       <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-r-md"><PlusIcon className="h-5 w-5" /></button>
                   </div>
                  <div className="flex">
                    <button type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center space-x-1">
                      <TrashIcon className="h-5 w-5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gray-100 p-6 rounded-lg sticky top-24">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/checkout" className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
