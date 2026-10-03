'use client';

import React from 'react';
import { useAuthStore } from '@/stores/auth-store';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-sm text-ink-secondary mt-1">
          Here is what is happening across your grid today.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
             <div className="h-4 w-24 bg-surface-raised rounded mb-4 animate-pulse"></div>
             <div className="h-8 w-16 bg-surface-raised rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
