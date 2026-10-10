import { apiClient } from '../client';
import { Feeder } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getFeeders = async (params?: any) => {
  const response: any = await apiClient.get('/feeders', { params });
  return { data: response.data.feeders as Feeder[], meta: response.data.meta };
};

export const getFeederById = async (id: string) => {
  const response: any = await apiClient.get(`/feeders/${id}`);
  return response.data as Feeder;
};

export const createFeeder = async (payload: Partial<Feeder>) => {
  const response: any = await apiClient.post('/feeders', payload);
  return response.data as Feeder;
};

export const updateFeeder = async (id: string, payload: Partial<Feeder>) => {
  if (Object.keys(payload).length === 1 && payload.status) {
    const response: any = await apiClient.patch(`/feeders/${id}/status`, { status: payload.status });
    return response.data as Feeder;
  }
  const response: any = await apiClient.patch(`/feeders/${id}`, payload);
  return response.data as Feeder;
};

export const deleteFeeder = async (id: string) => {
  const response: any = await apiClient.delete(`/feeders/${id}`);
  return response.data as { message: string };
};
