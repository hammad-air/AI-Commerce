
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createOrder({
        userId: user ? user.id : null,
        items: cartItems,
        total: cartTotal,
        customerName: name,
        customerEmail: email,
      });
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitting) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
             <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isSubmitting ? 'Placing Order...' : `Place Order ($${cartTotal.toFixed(2)})`}
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
           <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
           <ul className="space-y-3">
               {cartItems.map(item => (
                   <li key={item.id} className="flex justify-between items-start">
                       <div className="flex-1">
                           <p className="font-medium text-gray-800">{item.title}</p>
                           <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                       </div>
                       <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                   </li>
               ))}
           </ul>
           <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg">
               <span>Total</span>
               <span>${cartTotal.toFixed(2)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
