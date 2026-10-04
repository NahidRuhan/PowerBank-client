import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentEndpoints } from '../endpoints/payments';
import { toast } from 'sonner';

export function useMyPayments(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['my-payments', params],
    queryFn: () => paymentEndpoints.getMyPayments(params),
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: paymentEndpoints.initiatePayment,
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to initiate payment');
    },
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentEndpoints.refundPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-payments'] });
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      toast.success('Payment refunded successfully');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to refund payment');
    },
  });
}
