import { apiClient } from '../client';
import type { SheddingQuota } from '@/lib/types/schedule';
import type { PaginatedResponse } from '@/lib/types/api';

export const createQuota = async (data: unknown): Promise<SheddingQuota> => {
  return apiClient('/quotas', { method: 'POST', data });
};

export const getQuotas = async (params?: Record<string, unknown>): Promise<PaginatedResponse<SheddingQuota>> => {
  const query = new URLSearchParams(params || {}).toString();
  return apiClient(`/quotas${query ? '?' + query : ''}`);
};

export const getQuotaById = async (id: string): Promise<SheddingQuota> => {
  return apiClient(`/quotas/${id}`);
};
