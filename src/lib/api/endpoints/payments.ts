import { apiClient } from '../client';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { Payment } from '../../types/billing';

export const paymentEndpoints = {
  initiatePayment: async (billId: string): Promise<ApiResponse<{ checkoutUrl: string }>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.post('/payments/initiate', { billId });
    const result = response.data?.data || response.data || response;
    return { ...response, data: result } as ApiResponse<{ checkoutUrl: string }>;
  },

  getMyPayments: async (params?: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await apiClient.get('/payments/my-payments', { params });
    const d = response.data || {};
    const payments = Array.isArray(d) ? d : (Array.isArray(d.payments) ? d.payments : (Array.isArray(d.data) ? d.data : (Array.isArray(d.data?.data) ? d.data.data : [])));
    return { data: payments as Payment[], meta: d.meta || d.data?.meta };
  },

  refundPayment: async (id: string): Promise<ApiResponse<Payment>> => {
    const response = await apiClient.post<ApiResponse<Payment>>(`/payments/${id}/refund`);
    return response as unknown as ApiResponse<Payment>;
  }
};
