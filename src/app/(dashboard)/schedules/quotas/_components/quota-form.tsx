'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuotaSchema, type CreateQuotaInput } from '@/lib/validations/schedule';
import { useCreateQuota } from '@/lib/api/hooks/use-quotas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function QuotaForm({ onSuccess }: { onSuccess: () => void }) {
  const createQuota = useCreateQuota();
  const form = useForm<CreateQuotaInput>({
    resolver: zodResolver(createQuotaSchema),
    defaultValues: { date: '', timeSlot: '', targetMW: 0 },
  });

  const onSubmit = (data: CreateQuotaInput) => {
    try {
      const payload = { ...data, date: new Date(data.date).toISOString() };
      createQuota.mutate(payload, { onSuccess });
    } catch (err) {
      alert('Invalid date format');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Date (YYYY-MM-DD)</Label>
        <Input {...form.register('date')} />
      </div>
      <div className="space-y-2">
        <Label>Time Slot</Label>
        <Input {...form.register('timeSlot')} />
      </div>
      <div className="space-y-2">
        <Label>Target MW</Label>
        <Input type="number" step="0.1" {...form.register('targetMW', { valueAsNumber: true })} />
      </div>
      {createQuota.isError && (
        <div className="text-sm font-medium text-danger bg-danger-muted/20 p-3 rounded-md border border-danger/20">
          {createQuota.error instanceof Error ? createQuota.error.message : 'An error occurred'}
        </div>
      )}
      <Button type="submit" disabled={createQuota.isPending}>
        {createQuota.isPending ? 'Creating...' : 'Create'}
      </Button>
    </form>
  );
}
