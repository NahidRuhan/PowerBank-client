import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'OPERATOR' | 'ADMIN';
  meterNumber: string;
  areaId: string | null;
  avatar?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  setAuth: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
  clearAuth: () => set({ accessToken: null, user: null, isAuthenticated: false }),
}));
