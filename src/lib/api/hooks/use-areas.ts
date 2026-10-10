import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAreas, searchAreas, getAreaById, createArea, updateArea, deleteArea } from '../endpoints/areas';
import { Area } from '../../types/infrastructure';

export const useAreas = (params?: any) => {
  return useQuery({
    queryKey: ['areas', params],
    queryFn: () => getAreas(params),
  });
};

export const useSearchAreas = (q: string) => {
  return useQuery({
    queryKey: ['areas', 'search', q],
    queryFn: () => searchAreas(q),
    enabled: !!q && q.length > 1,
  });
};

export const useArea = (id: string) => {
  return useQuery({
    queryKey: ['areas', id],
    queryFn: () => getAreaById(id),
    enabled: !!id,
  });
};

export const useCreateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
  });
};

export const useUpdateArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Area> }) => updateArea(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
      queryClient.invalidateQueries({ queryKey: ['areas', variables.id] });
    },
  });
};

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
  });
};
