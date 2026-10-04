import { apiClient } from '../client';
import { Area } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getAreas = async (params?: Record<string, any>) => {
  const response: any = await apiClient.get('/areas', { params });
  return { data: response.data.areas as Area[], meta: response.data.meta };
};

export const searchAreas = async (q: string) => {
  const response: any = await apiClient.get('/areas/search', { params: { q } });
  return { data: response.data as Area[] };
};

export const getAreaById = async (id: string) => {
  const response: any = await apiClient.get(`/areas/${id}`);
  return response.data as Area;
};

export const createArea = async (payload: Partial<Area>) => {
  const response: any = await apiClient.post('/areas', payload);
  return response.data as Area;
};

export const updateArea = async (id: string, payload: Partial<Area>) => {
  const response: any = await apiClient.patch(`/areas/${id}`, payload);
  return response.data as Area;
};

export const deleteArea = async (id: string) => {
  const response: any = await apiClient.delete(`/areas/${id}`);
  return response.data as { message: string };
};
