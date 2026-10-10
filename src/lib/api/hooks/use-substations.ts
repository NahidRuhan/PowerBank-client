import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubstations, getSubstationById, createSubstation, updateSubstation, deleteSubstation } from '../endpoints/substations';
import { Substation } from '../../types/infrastructure';

export const useSubstations = (params?: any) => {
  return useQuery({
    queryKey: ['substations', params],
    queryFn: () => getSubstations(params),
  });
};

export const useSubstation = (id: string) => {
  return useQuery({
    queryKey: ['substations', id],
    queryFn: () => getSubstationById(id),
    enabled: !!id,
  });
};

export const useCreateSubstation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubstation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['substations'] });
    },
  });
};

export const useUpdateSubstation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Substation> }) => updateSubstation(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['substations'] });
      queryClient.invalidateQueries({ queryKey: ['substations', variables.id] });
    },
  });
};

export const useDeleteSubstation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubstation,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['substations'] });
      const previous = queryClient.getQueriesData({ queryKey: ['substations'] });
      queryClient.setQueriesData({ queryKey: ['substations'] }, (old: any) => {
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
      queryClient.invalidateQueries({ queryKey: ['substations'] });
    },
  });
};
