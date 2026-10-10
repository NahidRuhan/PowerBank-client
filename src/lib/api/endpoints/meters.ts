import { apiClient } from '../client';
import { Meter } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getMeters = async (params?: any) => {
  const response: any = await apiClient.get('/meters', { params });
  return response;
};

export const getMeterById = async (id: string) => {
  const { data } = await apiClient.get<{ data: Meter }>(`/meters/${id}`);
  return data;
};

export const createMeter = async (payload: Partial<Meter>) => {
  const { data } = await apiClient.post<{ data: Meter, message: string }>('/meters', payload);
  return data;
};

export const updateMeter = async (id: string, payload: Partial<Meter>) => {
  const { data } = await apiClient.patch<{ data: Meter, message: string }>(`/meters/${id}`, payload);
  return data;
};

export const deleteMeter = async (id: string) => {
  const { data } = await apiClient.delete<{ message: string }>(`/meters/${id}`);
  return data;
};
