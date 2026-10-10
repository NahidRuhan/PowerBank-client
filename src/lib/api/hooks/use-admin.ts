import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminEndpoints } from '../endpoints/admin';
import { toast } from 'sonner';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      return await adminEndpoints.getDashboard();
    },
  });
}

export function useUsers(params?: any) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: async () => {
      return await adminEndpoints.getUsers(params);
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminEndpoints.updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User role updated successfully');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to update user role');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminEndpoints.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to delete user');
    },
  });
}

export function useAuditLogs(params?: any) {
  return useQuery({
    queryKey: ['admin', 'audit-logs', params],
    queryFn: async () => {
      return await adminEndpoints.getAuditLogs(params);
    },
  });
}
