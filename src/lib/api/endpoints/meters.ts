import { apiClient } from '../client';
import { Meter } from '../../types/infrastructure';
import { PaginatedResponse } from '../../types/api';

export const getMeters = async (params?: any) => {
  const { data } = await apiClient.get<any>('/meters', { params });
  
  // Handle both the old array response and the new paginated response
  if (Array.isArray(data)) {
    const page = parseInt(params?.page as string) || 1;
    const limit = parseInt(params?.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMeters = data.slice(startIndex, endIndex);

    return { 
      data: paginatedMeters as Meter[], 
      meta: {
        total: data.length,
        page,
        limit,
        totalPages: Math.ceil(data.length / limit)
      } 
    };
  }
  
  return { data: data.meters as Meter[], meta: data.meta };
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
