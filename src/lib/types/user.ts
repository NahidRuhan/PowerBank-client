export type Role = 'CUSTOMER' | 'OPERATOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  meterNumber: string;
  areaId: string | null;
  phoneNumber?: string | null;
  avatar?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}