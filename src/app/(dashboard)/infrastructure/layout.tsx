import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function InfrastructureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Infrastructure</h2>
      </div>

      <div className="bg-surface-raised/50 rounded-lg p-4 border border-border border-dashed flex items-center gap-2 overflow-x-auto text-sm text-ink-secondary">
        <span className="font-medium text-ink-primary">Hierarchy:</span>
        <span className="px-2 py-1 bg-surface rounded shadow-sm border border-border">Zones</span>
        <span>→</span>
        <span className="px-2 py-1 bg-surface rounded shadow-sm border border-border">Substations</span>
        <span>→</span>
        <span className="px-2 py-1 bg-surface rounded shadow-sm border border-border">Feeders</span>
        <span>→</span>
        <span className="px-2 py-1 bg-surface rounded shadow-sm border border-border">Areas</span>
        <span>→</span>
        <span className="px-2 py-1 bg-surface rounded shadow-sm border border-border">Meters</span>
      </div>
      
      <div className="border-b border-border overflow-x-auto hide-scrollbar">
        <nav className="-mb-px flex space-x-4 md:space-x-8 min-w-max px-1" aria-label="Tabs">
          <Link href="/infrastructure/zones" className="border-transparent text-ink-secondary hover:text-ink-primary hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
            Zones
          </Link>
          <Link href="/infrastructure/substations" className="border-transparent text-ink-secondary hover:text-ink-primary hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
            Substations
          </Link>
          <Link href="/infrastructure/feeders" className="border-transparent text-ink-secondary hover:text-ink-primary hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
            Feeders
          </Link>
          <Link href="/infrastructure/areas" className="border-transparent text-ink-secondary hover:text-ink-primary hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
            Areas
          </Link>
          <Link href="/infrastructure/meters" className="border-transparent text-ink-secondary hover:text-ink-primary hover:border-border whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors">
            Meters
          </Link>
        </nav>
      </div>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
