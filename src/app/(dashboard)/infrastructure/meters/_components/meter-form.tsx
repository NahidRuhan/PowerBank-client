'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createMeterSchema } from '@/lib/validations/infrastructure';
import { useCreateMeter } from '@/lib/api/hooks/use-meters';
import { useAreas } from '@/lib/api/hooks/use-areas';
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

type MeterFormData = z.infer<typeof createMeterSchema>;

interface MeterFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeterFormDialog({ open, onOpenChange }: MeterFormDialogProps) {
  const createMutation = useCreateMeter();
  const { data: areasData } = useAreas();
  const areas = areasData?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<MeterFormData>({
    resolver: zodResolver(createMeterSchema),
    defaultValues: {
      number: '',
      areaId: ''
    }
  });

  const areaId = watch('areaId');

  useEffect(() => {
    if (!open) {
      reset({ number: '', areaId: '' });
    }
  }, [open, reset]);

  const onSubmit = (data: MeterFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => onOpenChange(false)
    });
  };

  const isPending = createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Meter</DialogTitle>
          <DialogDescription>
            Register a new electricity meter and assign it to an area.
          </DialogDescription>
        </DialogHeader>
        
        <form id="meter-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="number">Meter Number <span className="text-danger">*</span></Label>
            <Input 
              id="number" 
              placeholder="e.g. MTR-492810" 
              {...register('number')} 
              className={errors.number ? 'border-danger font-mono' : 'font-mono'}
            />
            {errors.number && <p className="text-danger text-xs">{errors.number.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Area <span className="text-danger">*</span></Label>
            <Select 
              value={areaId} 
              onValueChange={(value) => setValue('areaId', value as string, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.areaId ? 'border-danger' : ''}>
                <SelectValue placeholder="Select an area">
                  {areaId && areas.find(a => a.id === areaId) ? (
                    `${areas.find(a => a.id === areaId)?.name} (${areas.find(a => a.id === areaId)?.code})`
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name} ({area.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.areaId && <p className="text-danger text-xs">{errors.areaId.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button type="submit" form="meter-form" disabled={isPending}>
            {isPending ? 'Saving...' : 'Create Meter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
