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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

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
              <FormLabel>Month</FormLabel>
              <FormControl>
                <DatePicker
                  placeholderText="Select month"
                  onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM') : '')}
                  selected={field.value ? parse(field.value, 'yyyy-MM', new Date()) : null}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  wrapperClassName="w-full flex"
                />
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
                <DatePicker
                  placeholderText="Select due date"
                  onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                  selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : null}
                  dateFormat="yyyy-MM-dd"
                  className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  wrapperClassName="w-full flex"
                />
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
