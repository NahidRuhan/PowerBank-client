import { apiClient } from '../client';
import { ApiResponse } from '../../types/api';
import { User } from '../../types/user';

export const userEndpoints = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response as unknown as ApiResponse<User>;
  },

  updateProfile: async (data: Partial<User> | FormData): Promise<ApiResponse<User>> => {
    // Determine if data is FormData
    const isFormData = data instanceof FormData;
    const response = await apiClient.patch<ApiResponse<User>>('/users/me', data, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return response as unknown as ApiResponse<User>;
  },

  changePassword: async (data: Record<string, unknown>): Promise<ApiResponse<null>> => {
    const response = await apiClient.patch<ApiResponse<null>>('/users/me/password', data);
    return response as unknown as ApiResponse<null>;
  }
};
