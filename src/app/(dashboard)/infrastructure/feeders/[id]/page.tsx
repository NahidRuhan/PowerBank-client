'use client';

import { useParams } from 'next/navigation';
import { useFeeder } from '@/lib/api/hooks/use-feeders';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Plug } from '@phosphor-icons/react';
import { FeederStatusToggle } from '../_components/feeder-status-toggle';

export default function FeederDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: feeder, isLoading, isError } = useFeeder(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (isError || !feeder) {
    return <div>Failed to load feeder details.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={feeder.name}
        description={`Feeder details for ${feeder.code}`}
        action={
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink-secondary">Status:</span>
            <FeederStatusToggle feederId={feeder.id} currentStatus={feeder.status} />
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent-muted/20 flex items-center justify-center text-accent">
              <Plug size={20} />
            </div>
            <div>
              <h3 className="text-lg font-medium">{feeder.name}</h3>
              <p className="text-sm font-mono text-ink-secondary">{feeder.code}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Load (MW)</span>
              <p className="font-mono text-lg">{feeder.loadMW}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Substation</span>
              <p>{feeder.substation?.name || feeder.substationId}</p>
            </div>
            <div>
              <span className="text-ink-secondary font-medium uppercase tracking-wide text-xs">Created</span>
              <p>{format(new Date(feeder.createdAt), 'PPpp')}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Areas & Schedules</h3>
          </div>
          <div className="flex flex-col items-center justify-center p-8 text-center bg-surface-raised/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-ink-secondary">Connected areas and active schedules will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
