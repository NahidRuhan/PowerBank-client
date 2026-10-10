import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getZones, getZoneById, createZone, updateZone, deleteZone } from '../endpoints/zones';
import { Zone } from '../../types/infrastructure';

export const useZones = (params?: any) => {
  return useQuery({
    queryKey: ['zones', params],
    queryFn: () => getZones(params),
  });
};

export const useZone = (id: string) => {
  return useQuery({
    queryKey: ['zones', id],
    queryFn: () => getZoneById(id),
    enabled: !!id,
  });
};

export const useCreateZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createZone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};

export const useUpdateZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Zone> }) => updateZone(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['zones'] });
      queryClient.invalidateQueries({ queryKey: ['zones', variables.id] });
    },
  });
};

export const useDeleteZone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteZone,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['zones'] });
      const previous = queryClient.getQueriesData({ queryKey: ['zones'] });
      queryClient.setQueriesData({ queryKey: ['zones'] }, (old: any) => {
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
      queryClient.invalidateQueries({ queryKey: ['zones'] });
    },
  });
};
