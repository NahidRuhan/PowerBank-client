import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMeters, getMeterById, createMeter, updateMeter, deleteMeter } from '../endpoints/meters';
import { Meter } from '../../types/infrastructure';

export const useMeters = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['meters', params],
    queryFn: () => getMeters(params),
  });
};

export const useMeter = (id: string) => {
  return useQuery({
    queryKey: ['meters', id],
    queryFn: () => getMeterById(id),
    enabled: !!id,
  });
};

export const useCreateMeter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });
};

export const useUpdateMeter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Meter> }) => updateMeter(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meters'] });
      queryClient.invalidateQueries({ queryKey: ['meters', variables.id] });
    },
  });
};

export const useDeleteMeter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMeter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });
};
