import { z } from 'zod';

export const generateBillsSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Must be in YYYY-MM format'),
  baseAmount: z.number().min(0, 'Base amount must be positive'),
  dueDate: z.string().min(1, 'Due date is required')
});

export type GenerateBillsInput = z.infer<typeof generateBillsSchema>;
