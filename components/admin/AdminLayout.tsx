
import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '../icons/Icons';

const AdminLayout: React.FC = () => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
      `flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-200 ${
        isActive ? 'bg-gray-200 font-semibold' : ''
      }`;

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-4 border-b">
                     <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                        <BuildingStorefrontIcon className="h-7 w-7 text-indigo-600" />
                        <span>Admin Panel</span>
                    </Link>
                </div>
                <nav className="p-4 space-y-2">
                    <NavLink to="/admin/dashboard" className={navLinkClasses}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" className={navLinkClasses}>
                        Products
                    </NavLink>
                    <NavLink to="/admin/orders" className={navLinkClasses}>
                        Orders
                    </NavLink>
                     <NavLink to="/" className={navLinkClasses}>
                        Back to Store
                    </NavLink>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
