'use client';

import { useParams } from 'next/navigation';
import { useSubstation } from '@/lib/api/hooks/use-substations';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Lightning } from '@phosphor-icons/react';

export default function SubstationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: substation, isLoading, isError } = useSubstation(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !substation) {
    return <div>Failed to load substation details.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={substation.name}
        description={`Substation details for ${substation.code}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent-muted/20 flex items-center justify-center text-accent">
              <Lightning size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{substation.name}</h3>
              <p className="text-sm font-mono text-ink-secondary">{substation.code}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Capacity (MW)</span>
              <p className="font-mono text-lg">{substation.capacityMW}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Zone</span>
              <p>{substation.zone?.name || substation.zoneId}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Created</span>
              <p>{format(new Date(substation.createdAt), 'PPpp')}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Feeders</h3>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-raised/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-ink-secondary">Feeders belonging to this substation will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
