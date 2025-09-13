
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const StoreLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Gemini Commerce. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
