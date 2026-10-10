'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFeederSchema } from '@/lib/validations/infrastructure';
import { Feeder } from '@/lib/types/infrastructure';
import { useCreateFeeder, useUpdateFeeder } from '@/lib/api/hooks/use-feeders';
import { useSubstations } from '@/lib/api/hooks/use-substations';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';

type FeederFormData = z.infer<typeof createFeederSchema>;

interface FeederFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feeder?: Feeder;
}

export function FeederFormDialog({ open, onOpenChange, feeder }: FeederFormDialogProps) {
  const isEditing = !!feeder;
  const createMutation = useCreateFeeder();
  const updateMutation = useUpdateFeeder();
  const { data: substationsData } = useSubstations();
  const substations = substationsData?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FeederFormData>({
    resolver: zodResolver(createFeederSchema),
    defaultValues: {
      name: '',
      code: '',
      loadMW: 0,
      status: 'ENERGIZED',
      substationId: ''
    }
  });

  const substationId = watch('substationId');

  useEffect(() => {
    if (feeder && open) {
      reset({
        name: feeder.name,
        code: feeder.code,
        loadMW: feeder.loadMW,
        status: feeder.status,
        substationId: feeder.substationId
      });
    } else if (!open) {
      reset({ name: '', code: '', loadMW: 0, status: 'ENERGIZED', substationId: '' });
    }
  }, [feeder, open, reset]);

  const onSubmit = (data: FeederFormData) => {
    if (isEditing && feeder) {
      updateMutation.mutate({ id: feeder.id, payload: data }, {
        onSuccess: () => onOpenChange(false)
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => onOpenChange(false)
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Feeder' : 'Create Feeder'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this feeder.' : 'Add a new feeder and assign it to a substation.'}
          </DialogDescription>
        </DialogHeader>
        
        <form id="feeder-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="code">Feeder Code <span className="text-danger">*</span></Label>
              <Input 
                id="code" 
                placeholder="e.g. FDR-01" 
                {...register('code')} 
                className={errors.code ? 'border-danger' : ''}
              />
              {errors.code && <p className="text-danger text-xs">{errors.code.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="name">Feeder Name <span className="text-danger">*</span></Label>
              <Input 
                id="name" 
                placeholder="e.g. Main Line 1" 
                {...register('name')} 
                className={errors.name ? 'border-danger' : ''}
              />
              {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="loadMW">Load (MW) <span className="text-danger">*</span></Label>
            <Input 
              id="loadMW" 
              type="number"
              step="0.01"
              placeholder="e.g. 45.5" 
              {...register('loadMW')} 
              className={errors.loadMW ? 'border-danger font-mono' : 'font-mono'}
            />
            {errors.loadMW && <p className="text-danger text-xs">{errors.loadMW.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Substation <span className="text-danger">*</span></Label>
            <Select 
              value={substationId} 
              onValueChange={(value) => setValue('substationId', value as string, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.substationId ? 'border-danger' : ''}>
                <SelectValue placeholder="Select a substation">
                  {substationId && substations.find((s: any) => s.id === substationId) ? (
                    `${substations.find((s: any) => s.id === substationId)?.name} (${substations.find((s: any) => s.id === substationId)?.code})`
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {substations.map((sub: any) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.substationId && <p className="text-danger text-xs">{errors.substationId.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button type="submit" form="feeder-form" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Feeder')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
