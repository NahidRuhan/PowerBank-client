import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMeters, getMeterById, createMeter, updateMeter, deleteMeter } from '../endpoints/meters';
import { Meter } from '../../types/infrastructure';

export const useMeters = (params?: any) => {
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
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['meters'] });
      const previous = queryClient.getQueriesData({ queryKey: ['meters'] });
      queryClient.setQueriesData({ queryKey: ['meters'] }, (old: any) => {
        if (!old) return old;
        if (old.data && Array.isArray(old.data)) {
          return { ...old, data: old.data.filter((i: any) => i.id !== deletedId) };
        }
        if (Array.isArray(old)) return old.filter((i: any) => i.id !== deletedId);
        return old;
      });
      return { previous };
    },
    onError: (err, deletedId, context) => {
      if (context?.previous) {
        context.previous.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });
};
