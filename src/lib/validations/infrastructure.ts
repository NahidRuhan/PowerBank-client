import { z } from 'zod';

export const createZoneSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100),
  code: z.string().min(2, 'Code is too short').max(20),
  description: z.string().optional(),
});

export const createSubstationSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(20),
  capacityMW: z.coerce.number().positive(),
  zoneId: z.string().min(1, 'Please select a valid zone'),
});

export const createFeederSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(20),
  loadMW: z.coerce.number().nonnegative(),
  status: z.enum(['ENERGIZED', 'LOAD_SHED', 'FAULT', 'MAINTENANCE']),
  substationId: z.string().min(1, 'Please select a valid substation'),
});

export const createAreaSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(20),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  customerCount: z.coerce.number().nonnegative(),
  feederId: z.string().min(1, 'Please select a valid feeder'),
});

export const createMeterSchema = z.object({
  number: z.string().min(5).max(50),
  areaId: z.string().min(1, 'Please select a valid area'),
});
