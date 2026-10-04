export type ScheduleStatus = 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface SheddingQuota {
  id: string;
  date: string;
  timeSlot: string;
  targetMW: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledOutage {
  id: string;
  feederId: string;
  quotaId?: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: ScheduleStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  feeder?: {
    code: string;
    name: string;
    loadMW: number;
  };
}