'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { 
  SquaresFour, 
  MapPin, 
  Calendar, 
  Warning, 
  Receipt, 
  ShieldCheck,
  SignOut,
  List
} from '@phosphor-icons/react';
import { useLogout } from '@/lib/api/hooks/use-auth';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: SquaresFour, roles: ['CUSTOMER', 'OPERATOR', 'ADMIN'] },
    { name: 'Infrastructure', href: '/infrastructure', icon: MapPin, roles: ['OPERATOR', 'ADMIN'] },
    { name: 'Schedules', href: '/schedules', icon: Calendar, roles: ['CUSTOMER', 'OPERATOR', 'ADMIN'] },
    { name: 'Incidents', href: '/incidents', icon: Warning, roles: ['CUSTOMER', 'OPERATOR', 'ADMIN'] },
    { name: 'Billing', href: '/billing', icon: Receipt, roles: ['CUSTOMER', 'ADMIN'] },
    { name: 'Admin', href: '/admin', icon: ShieldCheck, roles: ['ADMIN'] },
  ];

  const allowedNav = navigation.filter((item) => user && item.roles.includes(user.role));

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-surface-raised">
      <div className="flex h-16 shrink-0 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256">
              <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-ink-primary">PowerBank</span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-2 flex-1 space-y-1 px-3">
          <p className="px-4 text-xs font-medium text-ink-tertiary uppercase tracking-wider mb-2">Main Menu</p>
          {allowedNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                    : 'text-ink-secondary hover:bg-surface hover:text-ink-primary border-l-2 border-transparent'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-accent' : 'text-ink-tertiary group-hover:text-ink-secondary'
                  }`}
                  weight={isActive ? "fill" : "regular"}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex shrink-0 border-t border-border p-4">
        <div className="flex w-full flex-col gap-3">
          <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-9 w-9 rounded-full bg-border flex items-center justify-center overflow-hidden">
              <span className="text-sm font-medium">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-ink-primary leading-none truncate max-w-[130px]">{user?.name}</span>
              <span className="text-xs text-ink-tertiary mt-1 capitalize">{user?.role.toLowerCase()}</span>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-danger hover:text-danger hover:bg-danger-muted"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <SignOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
