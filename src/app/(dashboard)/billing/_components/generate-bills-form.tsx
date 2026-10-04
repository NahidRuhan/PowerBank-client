'use client';

import { useGenerateBills } from '@/lib/api/hooks/use-bills';
import { generateBillsSchema, GenerateBillsInput } from '@/lib/validations/billing';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface GenerateBillsFormProps {
  onSuccess?: () => void;
}

export function GenerateBillsForm({ onSuccess }: GenerateBillsFormProps) {
  const { mutate: generateBills, isPending } = useGenerateBills();
  
  const form = useForm<GenerateBillsInput>({
    resolver: zodResolver(generateBillsSchema),
    defaultValues: {
      month: '',
      baseAmount: 0,
      dueDate: '',
    },
  });

  const onSubmit = (data: GenerateBillsInput) => {
    // Convert YYYY-MM-DD to full ISO datetime for the backend
    const formattedData = {
      ...data,
      dueDate: data.dueDate.includes('T') ? data.dueDate : `${data.dueDate}T23:59:59.999Z`
    };

    generateBills(formattedData, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month (YYYY-MM)</FormLabel>
              <FormControl>
                <Input placeholder="2023-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baseAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Amount (BDT)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="500" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? 'Generating...' : 'Generate Bills'}
        </Button>
      </form>
    </Form>
  );
}
