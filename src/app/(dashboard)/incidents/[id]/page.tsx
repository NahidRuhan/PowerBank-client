'use client';
import { useIncident, useUpdateIncident } from '@/lib/api/hooks/use-incidents';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { PriorityBadge } from '@/components/shared/priority-badge';
import { Button } from '@/components/ui/button';
import { IncidentTimeline } from '../_components/incident-timeline';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Image from 'next/image';

export default function IncidentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: incidentRaw, isLoading } = useIncident(id);
  const incident = (incidentRaw as any)?.data?.incident || (incidentRaw as any)?.data || incidentRaw;
  const updateIncident = useUpdateIncident();

  if (isLoading) return <div>Loading...</div>;
  if (!incident) return <div>Not found</div>;

  const handleStatus = (status: string) => {
    toast.promise(
      updateIncident.mutateAsync({ id, data: { status } }),
      {
        loading: 'Updating status...',
        success: `Incident status updated to ${status}`,
        error: (err) => `Failed to update status: ${(err as Error).message}`,
      }
    );
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
        {incident.photoUrl && (
          <div className="border p-4 rounded-lg col-span-2">
            <p className="text-sm text-ink-secondary mb-2">Attached Photo</p>
            <Image 
              src={incident.photoUrl} 
              alt="Incident attachment" 
              width={600}
              height={400}
              className="w-full max-w-md rounded-lg object-cover border border-border"
            />
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Timeline</h3>
        <IncidentTimeline status={incident.status} />
      </div>
    </div>
  );
}
