'use client';
import { useUpdateScheduleStatus } from '@/lib/api/hooks/use-schedules';
import { Button } from '@/components/ui/button';
import type { ScheduledOutage } from '@/lib/types/schedule';

export function ScheduleStatusActions({ schedule }: { schedule: ScheduledOutage }) {
  const updateStatus = useUpdateScheduleStatus();

  const handleStatus = (status: string) => {
    updateStatus.mutate({ id: schedule.id, status });
  };

  return (
    <div className="flex gap-2">
      {schedule.status === 'SCHEDULED' && (
        <>
          <Button onClick={() => handleStatus('ACTIVE')}>Activate</Button>
          <Button variant="destructive" onClick={() => handleStatus('CANCELLED')}>Cancel</Button>
        </>
      )}
      {schedule.status === 'ACTIVE' && (
        <Button onClick={() => handleStatus('COMPLETED')}>Complete</Button>
      )}
    </div>
  );
}
