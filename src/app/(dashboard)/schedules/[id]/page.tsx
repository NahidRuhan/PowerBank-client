'use client';
import { useSchedule } from '@/lib/api/hooks/use-schedules';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { ScheduleStatusActions } from '../_components/schedule-status-actions';
import { format } from 'date-fns';

export default function ScheduleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: scheduleRaw, isLoading } = useSchedule(id);
  const schedule = (scheduleRaw as any)?.data?.schedule || (scheduleRaw as any)?.data || scheduleRaw;

  if (isLoading) return <div>Loading...</div>;
  if (!schedule) return <div>Not found</div>;

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Schedule for Feeder ${schedule.feederId}`} 
        description="Detailed view of the shedding schedule."
        action={<ScheduleStatusActions schedule={schedule} />}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <p className="text-sm text-ink-secondary">Status</p>
          <div className="mt-1"><StatusBadge status={schedule.status} /></div>
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-sm text-ink-secondary">Time Window</p>
          <p className="font-medium mt-1">
            {format(new Date(schedule.startTime), 'MMM d, HH:mm')} - {format(new Date(schedule.endTime), 'MMM d, HH:mm')}
          </p>
        </div>
        <div className="border p-4 rounded-lg col-span-2">
          <p className="text-sm text-ink-secondary">Reason</p>
          <p className="mt-1">{schedule.reason}</p>
        </div>
      </div>
    </div>
  );
}
