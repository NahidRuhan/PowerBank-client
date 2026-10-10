import { apiClient } from '../client';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { User } from '../../types/user';
import { DashboardStats, AuditLog } from '../../types/admin';

export const adminEndpoints = {
  getDashboard: async (): Promise<ApiResponse<DashboardStats>> => {
    return await apiClient.get<unknown, ApiResponse<DashboardStats>>('/admin/dashboard');
  },

  getUsers: async (params?: any): Promise<PaginatedResponse<User>> => {
    return await apiClient.get<unknown, PaginatedResponse<User>>('/admin/users', { params });
  },

  updateUserRole: async (id: string, role: string): Promise<ApiResponse<User>> => {
    return await apiClient.patch<unknown, ApiResponse<User>>(`/admin/users/${id}/role`, { role });
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    return await apiClient.delete<unknown, ApiResponse<null>>(`/admin/users/${id}`);
  },

  getAuditLogs: async (params?: any): Promise<PaginatedResponse<AuditLog>> => {
    return await apiClient.get<unknown, PaginatedResponse<AuditLog>>('/admin/audit-logs', { params });
  }
};
