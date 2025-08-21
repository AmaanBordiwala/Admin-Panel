'use client';

import React from 'react';
import AppCard from '../../../components/Card';
import { Users, ShoppingCart, DollarSign, UserPlus } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AppCard>
            <Users className="w-8 h-8 mb-3 text-blue-500" />
              <h3 className="text-lg font-medium">Total Users</h3>
              <p className="text-3xl font-bold">1,234</p>
        </AppCard>
        <AppCard>
          <div>
            <ShoppingCart className="w-8 h-8 mb-3 text-green-500" />
              <h3 className="text-lg font-medium">Total Orders</h3>
              <p className="text-3xl font-bold">567</p>
          </div>
        </AppCard>
        <AppCard>
            <DollarSign className="w-8 h-8 mb-3 text-yellow-500" />
              <h3 className="text-lg font-medium">Revenue</h3>
              <p className="text-3xl font-bold">$12,345</p>
        </AppCard>
        <AppCard>
            <UserPlus className="w-8 h-8 mb-3 text-indigo-500" />
              <h3 className="text-lg font-medium">New Signups</h3>
              <p className="text-3xl font-bold">89</p>
        </AppCard>
      </div>
    </div>
  );
};

export default DashboardPage;
