'use client';

import { useParams } from 'next/navigation';
import { useZone } from '@/lib/api/hooks/use-zones';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { MapPin } from '@phosphor-icons/react';

export default function ZoneDetailPage() {
  const params = useParams();
  const zoneId = params.id as string;
  const { data: zone, isLoading, isError } = useZone(zoneId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !zone) {
    return <div>Failed to load zone details.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={zone.name}
        description={`Zone details for ${zone.code}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent-muted/20 flex items-center justify-center text-accent">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{zone.name}</h3>
              <p className="text-sm font-mono text-ink-secondary">{zone.code}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Created</span>
              <p>{format(new Date(zone.createdAt), 'PPpp')}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Description</span>
              <p>{zone.description || 'No description provided.'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Substations</h3>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-raised/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-ink-secondary">Substations belonging to this zone will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
