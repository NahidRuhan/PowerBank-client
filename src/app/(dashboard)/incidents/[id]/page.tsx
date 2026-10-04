'use client';
import { useIncident, useUpdateIncident } from '@/lib/api/hooks/use-incidents';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { PriorityBadge } from '@/components/shared/priority-badge';
import { Button } from '@/components/ui/button';
import { IncidentTimeline } from '../_components/incident-timeline';
import { format } from 'date-fns';

export default function IncidentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: incidentRaw, isLoading } = useIncident(id);
  const incident = incidentRaw?.data?.incident || incidentRaw?.data || incidentRaw;
  const updateIncident = useUpdateIncident();

  if (isLoading) return <div>Loading...</div>;
  if (!incident) return <div>Not found</div>;

  const handleStatus = (status: string) => {
    updateIncident.mutate({ id, data: { status } });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Incident ${incident.id.slice(0, 8)}`}
        description="Detailed view of the incident."
        action={
          <div className="flex gap-2">
            {incident.status === 'REPORTED' && <Button onClick={() => handleStatus('ACKNOWLEDGED')}>Acknowledge</Button>}
            {incident.status === 'ACKNOWLEDGED' && <Button onClick={() => handleStatus('IN_PROGRESS')}>Start Work</Button>}
            {incident.status === 'IN_PROGRESS' && <Button onClick={() => handleStatus('RESOLVED')}>Resolve</Button>}
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <p className="text-sm text-ink-secondary">Status & Priority</p>
          <div className="mt-2 flex gap-2">
            <StatusBadge status={incident.status} />
            <PriorityBadge priority={incident.priority || 'MEDIUM'} />
          </div>
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-sm text-ink-secondary">Feeder</p>
          <p className="font-mono mt-1">{incident.feederId}</p>
        </div>
        <div className="border p-4 rounded-lg col-span-2">
          <p className="text-sm text-ink-secondary">Description</p>
          <p className="mt-1">{incident.description}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Timeline</h3>
        <IncidentTimeline status={incident.status} />
      </div>
    </div>
  );
}
