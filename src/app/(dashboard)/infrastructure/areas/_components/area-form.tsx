'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createAreaSchema } from '@/lib/validations/infrastructure';
import { Area } from '@/lib/types/infrastructure';
import { useCreateArea, useUpdateArea } from '@/lib/api/hooks/use-areas';
import { useFeeders } from '@/lib/api/hooks/use-feeders';
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

type AreaFormData = z.infer<typeof createAreaSchema>;

interface AreaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area?: Area;
}

export function AreaFormDialog({ open, onOpenChange, area }: AreaFormDialogProps) {
  const isEditing = !!area;
  const createMutation = useCreateArea();
  const updateMutation = useUpdateArea();
  const { data: feedersData } = useFeeders();
  const feeders = feedersData?.data || [];

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AreaFormData>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      name: '',
      code: '',
      priority: 'MEDIUM',
      customerCount: 0,
      feederId: ''
    }
  });

  const feederId = watch('feederId');
  const priority = watch('priority');

  useEffect(() => {
    if (area && open) {
      reset({
        name: area.name,
        code: area.code,
        priority: area.priority,
        customerCount: area.customerCount,
        feederId: area.feederId
      });
    } else if (!open) {
      reset({ name: '', code: '', priority: 'MEDIUM', customerCount: 0, feederId: '' });
    }
  }, [area, open, reset]);

  const onSubmit = (data: AreaFormData) => {
    if (isEditing && area) {
      updateMutation.mutate({ id: area.id, payload: data }, {
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
          <DialogTitle>{isEditing ? 'Edit Area' : 'Create Area'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this area.' : 'Add a new area and assign it to a feeder.'}
          </DialogDescription>
        </DialogHeader>
        
        <form id="area-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="code">Area Code <span className="text-danger">*</span></Label>
              <Input 
                id="code" 
                placeholder="e.g. ARA-101" 
                {...register('code')} 
                className={errors.code ? 'border-danger' : ''}
              />
              {errors.code && <p className="text-danger text-xs">{errors.code.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="name">Area Name <span className="text-danger">*</span></Label>
              <Input 
                id="name" 
                placeholder="e.g. Gulshan 1" 
                {...register('name')} 
                className={errors.name ? 'border-danger' : ''}
              />
              {errors.name && <p className="text-danger text-xs">{errors.name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Priority <span className="text-danger">*</span></Label>
              <Select 
                value={priority || undefined} 
                onValueChange={(value: any) => setValue('priority', value, { shouldValidate: true })}
              >
                <SelectTrigger className={errors.priority ? 'border-danger' : ''}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && <p className="text-danger text-xs">{errors.priority.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customerCount">Customer Count <span className="text-danger">*</span></Label>
              <Input 
                id="customerCount" 
                type="number"
                placeholder="e.g. 1500" 
                {...register('customerCount')} 
                className={errors.customerCount ? 'border-danger font-mono' : 'font-mono'}
              />
              {errors.customerCount && <p className="text-danger text-xs">{errors.customerCount.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Feeder <span className="text-danger">*</span></Label>
            <Select 
              value={feederId || undefined} 
              onValueChange={(value) => setValue('feederId', value as string, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.feederId ? 'border-danger' : ''}>
                <SelectValue placeholder="Select a feeder" />
              </SelectTrigger>
              <SelectContent>
                {feeders.map((fdr) => (
                  <SelectItem key={fdr.id} value={fdr.id}>
                    {fdr.name} ({fdr.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.feederId && <p className="text-danger text-xs">{errors.feederId.message}</p>}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
          <Button type="submit" form="area-form" disabled={isPending}>
            {isPending ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Area')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
