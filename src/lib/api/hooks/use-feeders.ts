import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeeders, getFeederById, createFeeder, updateFeeder, deleteFeeder } from '../endpoints/feeders';
import { Feeder } from '../../types/infrastructure';

export const useFeeders = (params?: any) => {
  return useQuery({
    queryKey: ['feeders', params],
    queryFn: () => getFeeders(params),
  });
};

export const useFeeder = (id: string) => {
  return useQuery({
    queryKey: ['feeders', id],
    queryFn: () => getFeederById(id),
    enabled: !!id,
  });
};

export const useCreateFeeder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFeeder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeders'] });
    },
  });
};

export const useUpdateFeeder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Feeder> }) => updateFeeder(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['feeders'] });
      queryClient.invalidateQueries({ queryKey: ['feeders', variables.id] });
    },
  });
};

export const useDeleteFeeder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeeder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeders'] });
    },
  });
};
