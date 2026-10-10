import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as incidentsApi from '../endpoints/incidents';

export const useIncidents = (params?: any) => {
  return useQuery({
    queryKey: ['incidents', params],
    queryFn: () => incidentsApi.getIncidents(params),
  });
};

export const useIncident = (id: string) => {
  return useQuery({
    queryKey: ['incidents', id],
    queryFn: () => incidentsApi.getIncidentById(id),
    enabled: !!id,
  });
};

export const useCreateIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: incidentsApi.createIncident,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['incidents'] });
    },
  });
};

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: incidentsApi.updateIncident,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incidents', variables.id] });
    },
  });
};
