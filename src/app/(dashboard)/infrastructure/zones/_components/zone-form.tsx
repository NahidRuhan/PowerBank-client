'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createZoneSchema } from '@/lib/validations/infrastructure';
import { Zone } from '@/lib/types/infrastructure';
import { useCreateZone, useUpdateZone } from '@/lib/api/hooks/use-zones';
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
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

type ZoneFormData = z.infer<typeof createZoneSchema>;

interface ZoneFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zone?: Zone;
}

export function ZoneFormDialog({ open, onOpenChange, zone }: ZoneFormDialogProps) {
  const isEditing = !!zone;
  const createMutation = useCreateZone();
  const updateMutation = useUpdateZone();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ZoneFormData>({
    resolver: zodResolver(createZoneSchema),
    defaultValues: {
      name: '',
      code: '',
      description: ''
    }
  });

  useEffect(() => {
    if (zone && open) {
      reset({
        name: zone.name,
        code: zone.code,
        description: zone.description || ''
      });
    } else if (!open) {
      reset({ name: '', code: '', description: '' });
    }
  }, [zone, open, reset]);

  const onSubmit = (data: ZoneFormData) => {
    if (isEditing && zone) {
      updateMutation.mutate({ id: zone.id, payload: data }, {
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
          <DialogTitle>{isEditing ? 'Edit Zone' : 'Create Zone'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this zone.' : 'Add a new geographic zone to the infrastructure.'}
          </DialogDescription>
        </DialogHeader>
        
        <form id="zone-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="code">Zone Code <span className="text-danger">*</span></Label>
            <Input 
              id="code" 
              placeholder="e.g. ZN-DHAKA-N" 
              {...register('code')} 
              className={errors.code ? 'border-danger' : ''}
            />
            {errors.code && <p className="text-danger text-xs">{errors.code.message}</p>}
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="name">Zone Name <span className="text-danger">*</span></Label>
            <Input 
              id="name" 
              placeholder="e.g. Dhaka North" 
              {...register('name')} 
              className={errors.name ? 'border-danger' : ''}
            />
            {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Optional description" 
              {...register('description')} 
            />
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button type="submit" form="zone-form" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Zone')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
