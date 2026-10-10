import { apiClient } from '../client';
import type { ScheduledOutage } from '@/lib/types/schedule';
import type { PaginatedResponse } from '@/lib/types/api';

export const createSchedule = async (data: unknown): Promise<ScheduledOutage> => {
  return apiClient('/schedules', { method: 'POST', data });
};

export const getSchedules = async (params?: any): Promise<PaginatedResponse<ScheduledOutage>> => {
  const query = new URLSearchParams(params || {}).toString();
  return apiClient(`/schedules${query ? '?' + query : ''}`);
};

export const getScheduleById = async (id: string): Promise<ScheduledOutage> => {
  return apiClient(`/schedules/${id}`);
};

export const updateScheduleStatus = async ({ id, status }: { id: string; status: string }): Promise<ScheduledOutage> => {
  return apiClient(`/schedules/${id}/status`, { method: 'PATCH', data: { status } });
};

export const getFairness = async (): Promise<unknown> => {
  return apiClient('/schedules/fairness');
};

export const deleteSchedule = async (id: string): Promise<void> => {
  return apiClient(`/schedules/${id}`, { method: 'DELETE' });
};
