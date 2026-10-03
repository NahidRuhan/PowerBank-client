import { apiClient } from '../client';
import { ApiResponse } from '../../types/api';
import { User } from '../../types/auth'; // it's actually in types/user, but we can reuse User type
// Let's import from user
import { UpdateProfileRequest } from '../../types/user';

export const userEndpoints = {
  getProfile: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<any>('/users/me');
    return response as any;
  },

  updateProfile: async (data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.patch<any>('/users/me', data);
    return response as any;
  },

  changePassword: async (data: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.patch<any>('/users/me/password', data);
    return response as any;
  }
};
