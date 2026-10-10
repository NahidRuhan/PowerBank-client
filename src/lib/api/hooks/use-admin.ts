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
      // toast is now handled globally in client.ts
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminEndpoints.deleteUser,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['admin', 'users'] });
      const previous = queryClient.getQueriesData({ queryKey: ['admin', 'users'] });
      queryClient.setQueriesData({ queryKey: ['admin', 'users'] }, (old: any) => {
        if (!old) return old;
        // Handle standard pagination response
        if (old.data && Array.isArray(old.data)) {
          return { ...old, data: old.data.filter((i: any) => i.id !== deletedId) };
        }
        // Handle { data: { users: [] } } nested format
        if (old.data?.users && Array.isArray(old.data.users)) {
          return { ...old, data: { ...old.data, users: old.data.users.filter((i: any) => i.id !== deletedId) } };
        }
        // Handle flat array
        if (Array.isArray(old)) return old.filter((i: any) => i.id !== deletedId);
        return old;
      });
      return { previous };
    },
    onSuccess: () => {
      toast.success('User deleted successfully');
    },
    onError: (error: Error & { payload?: { message?: string } }, deletedId, context) => {
      if (context?.previous) {
        context.previous.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      // toast is now handled globally in client.ts
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
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
