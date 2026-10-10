'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setAuth, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(!isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'CUSTOMER') {
      if (pathname.startsWith('/infrastructure') || pathname.startsWith('/schedules')) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, pathname, router]);

  useEffect(() => {
    if (!isAuthenticated && isInitializing) {
      // On hard reload, Zustand is empty but we likely have a httpOnly cookie
      // Attempt to silently refresh to get the access token and user state
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      fetch('/api/auth/refresh', { method: 'POST', signal: controller.signal })
        .then(async (res) => {
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            setAuth(data.accessToken, data.user);
          } else {
            router.push('/login');
          }
        })
        .catch(() => router.push('/login'))
        .finally(() => setIsInitializing(false));
    } else if (!isAuthenticated && !isInitializing) {
      // If user logs out while on the dashboard, redirect without trying to refresh
      router.push('/login');
    }
  }, [isAuthenticated, isInitializing, router, setAuth]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-raised border-t-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Return null while waiting for the router.push('/login') to execute
    return null;
  }

  return (
    <div className="flex h-dvh w-full bg-canvas overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:shrink-0 print:hidden">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Topbar (simplistic for now) */}
        <div className="md:hidden flex items-center justify-between h-16 border-b border-border bg-surface px-4 print:hidden">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 rounded bg-accent flex items-center justify-center">
               {/* Icon */}
             </div>
             <span className="font-semibold text-ink-primary">PowerBank</span>
          </div>
          {/* Mobile menu toggle would go here */}
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto print:overflow-visible">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8 print:p-0 print:max-w-none print:mx-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
