import { apiClient } from '../client';
import { Zone } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getZones = async (params?: any) => {
  const response: any = await apiClient.get('/zones', { params });
  return { data: response.data.zones as Zone[], meta: response.data.meta };
};

export const getZoneById = async (id: string) => {
  const response: any = await apiClient.get(`/zones/${id}`);
  return response.data as Zone;
};

export const createZone = async (payload: Partial<Zone>) => {
  const response: any = await apiClient.post('/zones', payload);
  return response.data as Zone;
};

export const updateZone = async (id: string, payload: Partial<Zone>) => {
  const response: any = await apiClient.patch(`/zones/${id}`, payload);
  return response.data as Zone;
};

export const deleteZone = async (id: string) => {
  const response: any = await apiClient.delete(`/zones/${id}`);
  return response.data as { message: string };
};
