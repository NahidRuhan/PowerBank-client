'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIncidentSchema, type CreateIncidentInput } from '@/lib/validations/incident';
import { useCreateIncident } from '@/lib/api/hooks/use-incidents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export function IncidentForm() {
  const router = useRouter();
  const createIncident = useCreateIncident();
  const form = useForm<CreateIncidentInput>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: { feederId: '', description: '', photoUrl: '' },
  });

  const onSubmit = (data: CreateIncidentInput) => {
    createIncident.mutate(data, { 
      onSuccess: () => router.push('/incidents')
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Feeder ID</Label>
        <Input {...form.register('feederId')} placeholder="e.g. FDR-01" />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea {...form.register('description')} placeholder="Describe the outage..." rows={4} />
      </div>
      <div className="space-y-2">
        <Label>Photo URL (Optional)</Label>
        <Input {...form.register('photoUrl')} placeholder="https://..." />
      </div>
      {createIncident.isError && (
        <div className="text-sm font-medium text-danger bg-danger-muted/20 p-3 rounded-md border border-danger/20">
          {createIncident.error instanceof Error ? createIncident.error.message : 'An error occurred'}
        </div>
      )}
      <Button type="submit" disabled={createIncident.isPending}>
        {createIncident.isPending ? 'Submitting...' : 'Submit Report'}
      </Button>
    </form>
  );
}
