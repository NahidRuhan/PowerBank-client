import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authEndpoints } from '../endpoints/auth';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authEndpoints.login,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success('Successfully logged in');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Login failed');
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authEndpoints.register,
    onSuccess: () => {
      toast.success('Registration successful! Please log in.');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authEndpoints.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.info('Logged out successfully');
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authEndpoints.forgotPassword,
    onSuccess: () => {
      toast.success('Password reset email sent (if email exists)');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to request reset');
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authEndpoints.resetPassword,
    onSuccess: () => {
      toast.success('Password has been reset successfully');
    },
    onError: (error: Error & { payload?: { message?: string } }) => {
      toast.error(error?.payload?.message || error.message || 'Failed to reset password');
    },
  });
}
