import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { ApiError } from '../types/api';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercept requests to attach Bearer token from Zustand
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle 401 and parse custom errors
apiClient.interceptors.response.use(
  (response) => {
    // If backend uses the sendSuccess format
    if (response.data && response.data.success !== undefined) {
      return response.data;
    }
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // 1. Handle 401 Unauthorized (Token Expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry refresh calls to avoid infinite loops
      if (originalRequest.url?.includes('/auth/refresh-token')) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Call Next.js proxy route to refresh token (it has the httpOnly cookie)
        const refreshResponse = await axios.post('/api/auth/refresh');
        const newAccessToken = refreshResponse.data.accessToken;
        const user = refreshResponse.data.user;

        // Update Zustand store
        useAuthStore.getState().setAuth(newAccessToken, user);

        // Update original request header and retry
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return apiClient(originalRequest);
      } catch {
        // Refresh failed (e.g. token expired/invalid), logout user
        useAuthStore.getState().clearAuth();
        // Option: redirect to login via window.location here if desired, 
        // but middleware handles protection.
      }
    }

    // 2. Format custom ApiError
    const payload = error.response?.data as { message?: string; [key: string]: unknown } | undefined;
    const message = payload?.message || error.message || 'An unexpected error occurred';
    
    throw new ApiError(message, error.response?.status || 500, payload);
  }
);
