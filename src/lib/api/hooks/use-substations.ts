import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSubstations, getSubstationById, createSubstation, updateSubstation, deleteSubstation } from '../endpoints/substations';
import { Substation } from '../../types/infrastructure';

export const useSubstations = (params?: Record<string, unknown>) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['substations'] });
    },
  });
};
