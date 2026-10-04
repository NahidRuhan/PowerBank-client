import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billEndpoints } from '../endpoints/bills';
import { toast } from 'sonner';

export function useBills(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['bills', params],
    queryFn: () => billEndpoints.getBills(params),
  });
}

export function useMyBills(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ['my-bills', params],
    queryFn: () => billEndpoints.getMyBills(params),
  });
}

export function useBill(id: string) {
  return useQuery({
    queryKey: ['bills', id],
    queryFn: () => billEndpoints.getBillById(id),
    enabled: !!id,
  });
}

export function useGenerateBills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: billEndpoints.generateBills,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      toast.success(`Successfully generated ${data.data.count} bill(s)`);
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to generate bills');
    },
  });
}

export function useProcessOverdueBills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: billEndpoints.processOverdue,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      toast.success(`Processed ${data.data.count} overdue bill(s)`);
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to process overdue bills');
    },
  });
}
