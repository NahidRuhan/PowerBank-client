'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Overview', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Audit Logs', href: '/admin/audit-logs' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border overflow-x-auto hide-scrollbar">
        <nav className="-mb-px flex space-x-4 md:space-x-8 min-w-max px-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-accent text-accent'
                    : 'border-transparent text-ink-secondary hover:border-ink-tertiary hover:text-ink-primary'
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>{children}</div>
    </div>
  );
}
