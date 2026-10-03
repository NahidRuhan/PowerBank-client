'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // On hard reload, Zustand is empty but we likely have a httpOnly cookie
      // Attempt to silently refresh to get the access token and user state
      fetch('/api/auth/refresh', { method: 'POST' })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setAuth(data.accessToken, data.user);
          } else {
            router.push('/login');
          }
        })
        .catch(() => router.push('/login'))
        .finally(() => setIsInitializing(false));
    } else {
      setIsInitializing(false);
    }
  }, [isAuthenticated, router, setAuth]);

  if (isInitializing || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-raised border-t-accent" />
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] w-full bg-canvas overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Topbar (simplistic for now) */}
        <div className="md:hidden flex items-center justify-between h-16 border-b border-border bg-surface px-4">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 rounded bg-accent flex items-center justify-center">
               {/* Icon */}
             </div>
             <span className="font-semibold text-ink-primary">PowerBank</span>
          </div>
          {/* Mobile menu toggle would go here */}
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
