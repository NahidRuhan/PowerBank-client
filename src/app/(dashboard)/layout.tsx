'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Sidebar } from '@/components/layout/sidebar';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { List } from '@phosphor-icons/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setAuth, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(!isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        {/* Mobile Topbar */}
        <div className="md:hidden flex items-center justify-between h-16 border-b border-border bg-surface px-4 print:hidden shrink-0">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256">
                 <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
               </svg>
             </div>
             <span className="font-semibold text-ink-primary">PowerBank</span>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open mobile menu" />}>
              <List className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 !w-64 border-r-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Sidebar />
            </SheetContent>
          </Sheet>
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
