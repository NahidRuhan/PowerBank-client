import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userEndpoints } from '../endpoints/users';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const data = await userEndpoints.getProfile();
      // Optionally update user in zustand store
      if (data.data) {
        // useAuthStore.getState().setAuth(useAuthStore.getState().accessToken!, data.data);
      }
      return data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userEndpoints.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.payload?.message || error.message || 'Failed to update profile');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: userEndpoints.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: any) => {
      toast.error(error?.payload?.message || error.message || 'Failed to change password');
    },
  });
}
