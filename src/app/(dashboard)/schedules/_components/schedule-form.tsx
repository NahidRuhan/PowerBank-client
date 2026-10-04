'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createScheduleSchema, type CreateScheduleInput } from '@/lib/validations/schedule';
import { useCreateSchedule } from '@/lib/api/hooks/use-schedules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ScheduleForm({ onSuccess }: { onSuccess: () => void }) {
  const createSchedule = useCreateSchedule();
  const form = useForm<CreateScheduleInput>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: { feederId: '', quotaId: '', startTime: '', endTime: '', reason: '' },
  });

  const onSubmit = (data: CreateScheduleInput) => {
    try {
      const payload = { ...data, startTime: new Date(data.startTime).toISOString(), endTime: new Date(data.endTime).toISOString() };
      createSchedule.mutate(payload, { onSuccess });
    } catch (err) {
      alert('Invalid date format');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Feeder ID</Label>
        <Input {...form.register('feederId')} />
      </div>
      <div className="space-y-2">
        <Label>Quota ID (Optional)</Label>
        <Input {...form.register('quotaId')} />
      </div>
      <div className="space-y-2">
        <Label>Start Time (YYYY-MM-DDTHH:mm:ss)</Label>
        <Input {...form.register('startTime')} />
      </div>
      <div className="space-y-2">
        <Label>End Time (YYYY-MM-DDTHH:mm:ss)</Label>
        <Input {...form.register('endTime')} />
      </div>
      <div className="space-y-2">
        <Label>Reason</Label>
        <Input {...form.register('reason')} />
      </div>
      {createSchedule.isError && (
        <div className="text-sm font-medium text-danger bg-danger-muted/20 p-3 rounded-md border border-danger/20">
          {createSchedule.error instanceof Error ? createSchedule.error.message : 'An error occurred'}
        </div>
      )}
      <Button type="submit" disabled={createSchedule.isPending}>
        {createSchedule.isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
}
