import { z } from 'zod';

export const createIncidentSchema = z.object({
  feederId: z.string().min(1, 'Feeder is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  photoUrl: z.string().url().optional().or(z.literal('')),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;

export const updateIncidentSchema = z.object({
  status: z.enum(['REPORTED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED']).optional(),
  priority: z.string().optional(),
  estimatedRestoration: z.string().optional(),
  assignedToId: z.string().optional(),
});

export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
