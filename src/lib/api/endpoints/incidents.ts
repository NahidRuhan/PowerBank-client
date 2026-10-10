import { apiClient } from '../client';
import type { OutageIncident } from '@/lib/types/incident';
import type { PaginatedResponse } from '@/lib/types/api';

export const createIncident = async (data: unknown): Promise<OutageIncident> => {
  return apiClient('/incidents', { method: 'POST', data });
};

export const getIncidents = async (params?: any): Promise<PaginatedResponse<OutageIncident>> => {
  const query = new URLSearchParams(params || {}).toString();
  return apiClient(`/incidents${query ? '?' + query : ''}`);
};

export const getIncidentById = async (id: string): Promise<OutageIncident> => {
  return apiClient(`/incidents/${id}`);
};

export const updateIncident = async ({ id, data }: { id: string; data: unknown }): Promise<OutageIncident> => {
  return apiClient(`/incidents/${id}`, { method: 'PATCH', data });
};
