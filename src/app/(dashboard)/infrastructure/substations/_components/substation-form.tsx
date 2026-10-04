'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createSubstationSchema } from '@/lib/validations/infrastructure';
import { Substation } from '@/lib/types/infrastructure';
import { useCreateSubstation, useUpdateSubstation } from '@/lib/api/hooks/use-substations';
import { useZones } from '@/lib/api/hooks/use-zones';
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

type SubstationFormData = z.infer<typeof createSubstationSchema>;

interface SubstationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  substation?: Substation;
}

export function SubstationFormDialog({ open, onOpenChange, substation }: SubstationFormDialogProps) {
  const isEditing = !!substation;
  const createMutation = useCreateSubstation();
  const updateMutation = useUpdateSubstation();
  const { data: zonesData } = useZones();
  const zones = zonesData?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<SubstationFormData>({
    resolver: zodResolver(createSubstationSchema),
    defaultValues: {
      name: '',
      code: '',
      capacityMW: 0,
      zoneId: ''
    }
  });

  const zoneId = watch('zoneId');

  useEffect(() => {
    if (substation && open) {
      reset({
        name: substation.name,
        code: substation.code,
        capacityMW: substation.capacityMW,
        zoneId: substation.zoneId
      });
    } else if (!open) {
      reset({ name: '', code: '', capacityMW: 0, zoneId: '' });
    }
  }, [substation, open, reset]);

  const onSubmit = (data: SubstationFormData) => {
    if (isEditing && substation) {
      updateMutation.mutate({ id: substation.id, payload: data }, {
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
          <DialogTitle>{isEditing ? 'Edit Substation' : 'Create Substation'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this substation.' : 'Add a new substation and assign it to a zone.'}
          </DialogDescription>
        </DialogHeader>
        
        <form id="substation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="code">Substation Code <span className="text-danger">*</span></Label>
              <Input 
                id="code" 
                placeholder="e.g. SUB-DHK-01" 
                {...register('code')} 
                className={errors.code ? 'border-danger' : ''}
              />
              {errors.code && <p className="text-danger text-xs">{errors.code.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="name">Substation Name <span className="text-danger">*</span></Label>
              <Input 
                id="name" 
                placeholder="e.g. Dhaka Main" 
                {...register('name')} 
                className={errors.name ? 'border-danger' : ''}
              />
              {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="capacityMW">Capacity (MW) <span className="text-danger">*</span></Label>
            <Input 
              id="capacityMW" 
              type="number"
              step="0.01"
              placeholder="e.g. 150.5" 
              {...register('capacityMW')} 
              className={errors.capacityMW ? 'border-danger font-mono' : 'font-mono'}
            />
            {errors.capacityMW && <p className="text-danger text-xs">{errors.capacityMW.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Zone <span className="text-danger">*</span></Label>
            <Select 
              value={zoneId || undefined} 
              onValueChange={(value) => setValue('zoneId', value as string, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.zoneId ? 'border-danger' : ''}>
                <SelectValue placeholder="Select a zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name} ({zone.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.zoneId && <p className="text-danger text-xs">{errors.zoneId.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button type="submit" form="substation-form" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Substation')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
