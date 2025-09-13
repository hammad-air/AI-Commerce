
import React, { useState, useEffect } from 'react';
import { Product, Order } from '../../types';
import * as api from '../../services/api';

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [productsData, ordersData] = await Promise.all([api.getProducts(), api.getOrders()]);
                const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
                setStats({
                    products: productsData.length,
                    orders: ordersData.length,
                    revenue: totalRevenue
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Revenue" value={`$${stats.revenue.toFixed(2)}`} />
                <StatCard title="Total Orders" value={stats.orders.toString()} />
                <StatCard title="Total Products" value={stats.products.toString()} />
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
    );
};


export default AdminDashboardPage;
