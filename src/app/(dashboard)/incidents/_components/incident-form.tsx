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
import { ChangeEvent, useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useArea } from '@/lib/api/hooks/use-areas';

export function IncidentForm() {
  const router = useRouter();
  const createIncident = useCreateIncident();
  const [file, setFile] = useState<File | null>(null);
  
  const user = useAuthStore((state) => state.user);
  const isCustomer = user?.role === 'CUSTOMER';
  const { data: areaData, isLoading: isLoadingArea } = useArea(user?.areaId || '');
  
  const form = useForm<CreateIncidentInput>({
    resolver: zodResolver(createIncidentSchema),
    defaultValues: { feederId: '', description: '' },
  });

  useEffect(() => {
    if (isCustomer && areaData?.feederId) {
      form.setValue('feederId', areaData.feederId);
    }
  }, [isCustomer, areaData, form]);

  const onSubmit = async (data: CreateIncidentInput) => {
    const formData = new FormData();
    formData.append('feederId', data.feederId);
    formData.append('description', data.description);
    if (file) {
      formData.append('photo', file);
    }
    
    try {
      await createIncident.mutateAsync(formData as any);
      router.push('/incidents');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Feeder ID</Label>
        <Input 
          {...form.register('feederId')} 
          placeholder={isLoadingArea && isCustomer ? 'Loading feeder...' : 'e.g. FDR-01'}
          disabled={isCustomer || isLoadingArea || createIncident.isPending}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea {...form.register('description')} placeholder="Describe the outage..." rows={4} disabled={createIncident.isPending} />
      </div>
      <div className="space-y-2">
        <Label>Photo (Optional)</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} disabled={createIncident.isPending} />
      </div>
      {createIncident.isError && (
        <div className="text-sm font-medium text-danger bg-danger-muted/20 p-3 rounded-md border border-danger/20">
          {createIncident.error instanceof Error ? createIncident.error.message : 'An error occurred'}
        </div>
      )}
      <Button type="submit" disabled={createIncident.isPending || (isCustomer && !areaData?.feederId && !isLoadingArea)}>
        {createIncident.isPending ? 'Submitting...' : 'Submit Report'}
      </Button>
    </form>
  );
}
