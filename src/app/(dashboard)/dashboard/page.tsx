'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { CustomerDashboard } from './_components/customer-dashboard';
import { OperatorDashboard } from './_components/operator-dashboard';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      router.replace('/admin');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-sm text-ink-secondary mt-1">
          {user?.role === 'CUSTOMER' 
            ? 'Here is your current grid status and recent updates.' 
            : 'Here is what is happening across the grid today.'}
        </p>
      </div>
      
      {user?.role === 'CUSTOMER' && <CustomerDashboard />}
      {user?.role === 'OPERATOR' && <OperatorDashboard />}
      {/* ADMIN is redirected to /admin */}
    </div>
  );
}
