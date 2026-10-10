'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createScheduleSchema, type CreateScheduleInput } from '@/lib/validations/schedule';
import { useCreateSchedule } from '@/lib/api/hooks/use-schedules';
import { useFeeders } from '@/lib/api/hooks/use-feeders';
import { useQuotas } from '@/lib/api/hooks/use-quotas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export function ScheduleForm({ onSuccess }: { onSuccess: () => void }) {
  const createSchedule = useCreateSchedule();
  const { data: feedersData } = useFeeders();
  const { data: quotasData } = useQuotas();
  const feeders = feedersData?.data || [];
  
  // Quotas endpoint returns data wrapped in data sometimes or paginated depending on response
  const quotas = Array.isArray((quotasData as any)?.data) ? (quotasData as any).data : ((quotasData as any)?.data?.quotas || (quotasData as any)?.data?.data || []);

  const form = useForm<CreateScheduleInput>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: { feederId: '', quotaId: '', startTime: '', endTime: '', reason: '' },
  });

  const { watch, setValue, register, handleSubmit, formState: { errors } } = form;
  const feederId = watch('feederId');
  const quotaId = watch('quotaId');

  const onSubmit = (data: CreateScheduleInput) => {
    try {
      const payload = { ...data, startTime: new Date(data.startTime).toISOString(), endTime: new Date(data.endTime).toISOString() };
      // If quotaId is empty string, make it undefined/null based on API expectations
      if (!payload.quotaId) {
        delete payload.quotaId;
      }
      createSchedule.mutate(payload, { onSuccess });
    } catch (err) {
      alert('Invalid date format');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Feeder <span className="text-danger">*</span></Label>
        <Select 
          value={feederId} 
          onValueChange={(value) => setValue('feederId', value as string, { shouldValidate: true })}
        >
          <SelectTrigger className={errors.feederId ? 'border-danger' : ''}>
            <SelectValue placeholder="Select a feeder">
              {feederId && feeders.find((f: any) => f.id === feederId) ? (
                `${feeders.find((f: any) => f.id === feederId)?.name} (${feeders.find((f: any) => f.id === feederId)?.code})`
              ) : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {feeders.map((fdr: any) => (
              <SelectItem key={fdr.id} value={fdr.id}>
                {fdr.name} ({fdr.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.feederId && <p className="text-danger text-xs">{errors.feederId.message}</p>}
      </div>
      
      <div className="space-y-2">
        <Label>Quota (Optional)</Label>
        <Select 
          value={quotaId} 
          onValueChange={(value) => setValue('quotaId', value === 'none' ? '' : (value as string), { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a quota (optional)">
              {quotaId && quotas.find((q: any) => q.id === quotaId) ? (
                `${format(new Date(quotas.find((q: any) => q.id === quotaId)?.date), 'MMM d, yyyy')} - ${quotas.find((q: any) => q.id === quotaId)?.timeSlot} (${quotas.find((q: any) => q.id === quotaId)?.targetMW} MW)`
              ) : null}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Quota</SelectItem>
            {quotas.map((quota: any) => (
              <SelectItem key={quota.id} value={quota.id}>
                {format(new Date(quota.date), 'MMM d, yyyy')} - {quota.timeSlot} ({quota.targetMW} MW)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Start Time <span className="text-danger">*</span></Label>
        <Controller
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select start time"
              onChange={(date: Date | null) => field.onChange(date ? date.toISOString() : '')}
              selected={field.value ? new Date(field.value) : null}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={`h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm ${errors.startTime ? 'border-danger' : ''}`}
              wrapperClassName="w-full flex"
            />
          )}
        />
        {errors.startTime && <p className="text-danger text-xs">{errors.startTime.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>End Time <span className="text-danger">*</span></Label>
        <Controller
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select end time"
              onChange={(date: Date | null) => field.onChange(date ? date.toISOString() : '')}
              selected={field.value ? new Date(field.value) : null}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={`h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm ${errors.endTime ? 'border-danger' : ''}`}
              wrapperClassName="w-full flex"
            />
          )}
        />
        {errors.endTime && <p className="text-danger text-xs">{errors.endTime.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Reason <span className="text-danger">*</span></Label>
        <Input {...register('reason')} className={errors.reason ? 'border-danger' : ''} />
        {errors.reason && <p className="text-danger text-xs">{errors.reason.message}</p>}
      </div>

      {createSchedule.isError && (
        <div className="text-sm font-medium text-danger bg-danger-muted/20 p-3 rounded-md border border-danger/20">
          {createSchedule.error instanceof Error ? createSchedule.error.message : 'An error occurred'}
        </div>
      )}

      <Button type="submit" disabled={createSchedule.isPending}>
        {createSchedule.isPending ? 'Creating...' : 'Create Schedule'}
      </Button>
    </form>
  );
}
