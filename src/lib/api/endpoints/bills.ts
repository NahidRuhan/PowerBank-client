import { apiClient } from '../client';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { Bill } from '../../types/billing';
import { GenerateBillsInput } from '../../validations/billing';

export const billEndpoints = {
  generateBills: async (data: GenerateBillsInput): Promise<ApiResponse<{ count: number }>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.post('/bills/generate', data);
    const result = response.data?.data || response.data;
    const count = result?.generatedCount ?? result?.count ?? 0;
    return { ...response, data: { count } } as ApiResponse<{ count: number }>;
  },

  getBills: async (params?: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get('/bills', { params });
    return response;
  },

  getMyBills: async (params?: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get('/bills/my-bills', { params });
    return response;
  },

  processOverdue: async (): Promise<ApiResponse<{ count: number }>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.post('/bills/process-overdue');
    const result = response.data?.data || response.data;
    const count = result?.processedCount ?? result?.count ?? 0;
    return { ...response, data: { count } } as ApiResponse<{ count: number }>;
  },

  getBillById: async (id: string): Promise<ApiResponse<Bill>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get(`/bills/${id}`);
    const bill = response.data?.data || response.data;
    return { ...response, data: bill } as ApiResponse<Bill>;
  }
};
