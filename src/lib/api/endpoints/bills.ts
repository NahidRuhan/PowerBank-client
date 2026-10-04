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

  getBills: async (params?: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get('/bills', { params });
    const d = response.data || {};
    const bills = Array.isArray(d) ? d : (Array.isArray(d.bills) ? d.bills : (Array.isArray(d.data) ? d.data : (Array.isArray(d.data?.data) ? d.data.data : [])));
    return { data: bills as Bill[], meta: d.meta || d.data?.meta };
  },

  getMyBills: async (params?: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get('/bills/my-bills', { params });
    const d = response.data || {};
    const bills = Array.isArray(d) ? d : (Array.isArray(d.bills) ? d.bills : (Array.isArray(d.data) ? d.data : (Array.isArray(d.data?.data) ? d.data.data : [])));
    return { data: bills as Bill[], meta: d.meta || d.data?.meta };
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
