import { apiClient } from '../client';
import { ApiResponse } from '../../types/api';
import { User } from '../../types/user';
import type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput
} from '../../validations/auth';

export const authEndpoints = {
  register: async (data: RegisterInput): Promise<ApiResponse<User>> => {
    // We assume backend returns ApiResponse for register
    const response = await apiClient.post<ApiResponse<User>>('/auth/register', data);
    return response as unknown as ApiResponse<User>; // The interceptor returns response.data directly if it has .success
  },
  
  login: async (data: LoginInput): Promise<{ accessToken: string, user: User }> => {
    // Hits the Next.js proxy to set httpOnly cookie
    const response = await apiClient.post<{ accessToken: string, user: User }>('/api/auth/login', data, {
      baseURL: '/' // override the base URL to hit our own proxy
    });
    return response as unknown as { accessToken: string, user: User }; 
  },
  
  logout: async (): Promise<void> => {
    // Hits the proxy to clear cookie, which might optionally call backend
    await apiClient.post('/api/auth/logout', {}, { baseURL: '/' });
  },

  forgotPassword: async (data: ForgotPasswordInput): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', data);
    return response as unknown as ApiResponse<null>;
  },

  resetPassword: async (data: ResetPasswordInput): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/reset-password', data);
    return response as unknown as ApiResponse<null>;
  },
};
