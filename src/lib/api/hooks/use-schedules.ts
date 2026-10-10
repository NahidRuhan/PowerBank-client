import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as schedulesApi from '../endpoints/schedules';

export const useSchedules = (params?: any) => {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: () => schedulesApi.getSchedules(params),
  });
};

export const useSchedule = (id: string) => {
  return useQuery({
    queryKey: ['schedules', id],
    queryFn: () => schedulesApi.getScheduleById(id),
    enabled: !!id,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schedulesApi.createSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};

export const useUpdateScheduleStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schedulesApi.updateScheduleStatus,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['schedules', variables.id] });
    },
  });
};

export const useScheduleFairness = () => {
  return useQuery({
    queryKey: ['schedules', 'fairness'],
    queryFn: schedulesApi.getFairness,
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schedulesApi.deleteSchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};
