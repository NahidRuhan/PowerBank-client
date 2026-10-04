import { apiClient } from '../client';
import { Substation } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getSubstations = async (params?: Record<string, any>) => {
  const response: any = await apiClient.get('/substations', { params });
  return { data: response.data.substations as Substation[], meta: response.data.meta };
};

export const getSubstationById = async (id: string) => {
  const response: any = await apiClient.get(`/substations/${id}`);
  return response.data as Substation;
};

export const createSubstation = async (payload: Partial<Substation>) => {
  const response: any = await apiClient.post('/substations', payload);
  return response.data as Substation;
};

export const updateSubstation = async (id: string, payload: Partial<Substation>) => {
  const response: any = await apiClient.patch(`/substations/${id}`, payload);
  return response.data as Substation;
};

export const deleteSubstation = async (id: string) => {
  const response: any = await apiClient.delete(`/substations/${id}`);
  return response.data as { message: string };
};
