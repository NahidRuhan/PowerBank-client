import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as quotasApi from '../endpoints/quotas';

export const useQuotas = (params?: any) => {
  return useQuery({
    queryKey: ['quotas', params],
    queryFn: () => quotasApi.getQuotas(params),
  });
};

export const useQuota = (id: string) => {
  return useQuery({
    queryKey: ['quotas', id],
    queryFn: () => quotasApi.getQuotaById(id),
    enabled: !!id,
  });
};

export const useCreateQuota = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: quotasApi.createQuota,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quotas'] });
    },
  });
};
