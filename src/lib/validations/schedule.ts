import { z } from 'zod';

export const createQuotaSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  targetMW: z.number().positive('Target MW must be positive'),
});

export type CreateQuotaInput = z.infer<typeof createQuotaSchema>;

export const createScheduleSchema = z.object({
  feederId: z.string().min(1, 'Feeder is required'),
  quotaId: z.string().optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  reason: z.string().min(1, 'Reason is required'),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
