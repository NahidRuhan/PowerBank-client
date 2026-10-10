'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createQuotaSchema, type CreateQuotaInput } from '@/lib/validations/schedule';
import { useCreateQuota } from '@/lib/api/hooks/use-quotas';
import { Button } from '@/components/ui/button';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
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
        <Label>Date</Label>
        <Controller
          control={form.control}
          name="date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={(date: Date | null) => field.onChange(date ? date.toISOString() : '')}
              selected={field.value ? new Date(field.value) : null}
              dateFormat="yyyy-MM-dd"
              className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              wrapperClassName="w-full flex"
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Time Slot</Label>
        <div className="flex items-center gap-2">
          <Controller
            control={form.control}
            name="timeSlot"
            render={({ field }) => {
              const [startStr, endStr] = (field.value || '').split('-');
              const startDate = startStr ? parse(startStr, 'HH:mm', new Date()) : null;
              const endDate = endStr ? parse(endStr, 'HH:mm', new Date()) : null;

              return (
                <>
                  <DatePicker
                    placeholderText="Start time"
                    onChange={(date: Date | null) => {
                      const newStart = date ? format(date, 'HH:mm') : '';
                      field.onChange(`${newStart}-${endStr || ''}`);
                    }}
                    selected={startDate}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Start"
                    dateFormat="HH:mm"
                    className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                    wrapperClassName="w-full flex"
                  />
                  <span>-</span>
                  <DatePicker
                    placeholderText="End time"
                    onChange={(date: Date | null) => {
                      const newEnd = date ? format(date, 'HH:mm') : '';
                      field.onChange(`${startStr || ''}-${newEnd}`);
                    }}
                    selected={endDate}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="End"
                    dateFormat="HH:mm"
                    className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                    wrapperClassName="w-full flex"
                  />
                </>
              );
            }}
          />
        </div>
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
