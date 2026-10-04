'use client';

import { useParams } from 'next/navigation';
import { useArea } from '@/lib/api/hooks/use-areas';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { MapTrifold } from '@phosphor-icons/react';
import { PriorityBadge } from '@/components/shared/priority-badge';

export default function AreaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: area, isLoading, isError } = useArea(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !area) {
    return <div>Failed to load area details.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={area.name}
        description={`Area details for ${area.code}`}
        action={
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink-secondary">Priority:</span>
            <PriorityBadge priority={area.priority} />
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent-muted/20 flex items-center justify-center text-accent">
              <MapTrifold size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{area.name}</h3>
              <p className="text-sm font-mono text-ink-secondary">{area.code}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Customer Count</span>
              <p className="font-mono text-lg">{area.customerCount}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Feeder</span>
              <p>{area.feeder?.name || area.feederId}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Created</span>
              <p>{format(new Date(area.createdAt), 'PPpp')}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Meters & Incidents</h3>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-raised/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-ink-secondary">Meters in this area and related incidents will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
