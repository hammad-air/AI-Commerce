
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBagIcon, UserCircleIcon, ArrowRightOnRectangleIcon, BuildingStorefrontIcon, Cog6ToothIcon } from './icons/Icons';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
              <BuildingStorefrontIcon className="h-7 w-7 text-indigo-600" />
              <span>Gemini</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <NavLink to="/admin" className={({ isActive }) => `flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600' : ''}`}>
                 <Cog6ToothIcon className="h-6 w-6" />
                <span className="hidden sm:inline">Admin</span>
              </NavLink>
            )}
            <NavLink to="/cart" className={({ isActive }) => `relative flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600' : ''}`}>
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
              )}
            </NavLink>
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                   <UserCircleIcon className="h-7 w-7" />
                </button>
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Signed in as<br />
                      <span className="font-semibold">{user.email}</span>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                 </div>
              </div>
            ) : (
              <NavLink to="/sign-in" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
