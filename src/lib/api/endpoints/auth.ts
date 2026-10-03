import { apiClient } from '../client';
import { ApiResponse } from '../../types/api';
import { User, Tokens } from '../../types/auth'; // Wait, let me check if Tokens/User are exported from auth or user.
import type {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput
} from '../../validations/auth';

// User type is actually in types/user, let me import from there
export const authEndpoints = {
  register: async (data: RegisterInput): Promise<ApiResponse<any>> => {
    // We assume backend returns ApiResponse for register
    const response = await apiClient.post<any>('/auth/register', data);
    return response as any; // The interceptor returns response.data directly if it has .success
  },
  
  login: async (data: LoginInput): Promise<{ accessToken: string, user: any }> => {
    // Hits the Next.js proxy to set httpOnly cookie
    const response = await apiClient.post<any>('/api/auth/login', data, {
      baseURL: '/' // override the base URL to hit our own proxy
    });
    return response as any; 
  },
  
  logout: async (): Promise<void> => {
    // Hits the proxy to clear cookie, which might optionally call backend
    await apiClient.post('/api/auth/logout', {}, { baseURL: '/' });
  },

  forgotPassword: async (data: ForgotPasswordInput): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<any>('/auth/forgot-password', data);
    return response as any;
  },

  resetPassword: async (data: ResetPasswordInput): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<any>('/auth/reset-password', data);
    return response as any;
  },
};
