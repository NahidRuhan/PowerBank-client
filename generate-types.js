const fs = require('fs');
const path = require('path');

const typesDir = path.join(__dirname, 'src/lib/types');

const types = {
  'auth.ts': `
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
`,
  'user.ts': `
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
`,
  'infrastructure.ts': `
export type FeederStatus = 'ENERGIZED' | 'LOAD_SHED' | 'FAULT' | 'MAINTENANCE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Zone {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Substation {
  id: string;
  name: string;
  code: string;
  capacityMW: number;
  zoneId: string;
  zone?: Zone;
  createdAt: string;
  updatedAt: string;
}

export interface Feeder {
  id: string;
  name: string;
  code: string;
  loadMW: number;
  status: FeederStatus;
  substationId: string;
  substation?: Substation;
  createdAt: string;
  updatedAt: string;
}

export interface Area {
  id: string;
  name: string;
  code: string;
  feederId: string;
  priority: Priority;
  customerCount: number;
  feeder?: Feeder;
  createdAt: string;
  updatedAt: string;
}

export interface Meter {
  id: string;
  number: string;
  areaId: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'schedule.ts': `
export type ScheduleStatus = 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface SheddingQuota {
  id: string;
  date: string;
  timeSlot: string;
  targetMW: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduledOutage {
  id: string;
  feederId: string;
  quotaId?: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: ScheduleStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'incident.ts': `
export type IncidentStatus = 'REPORTED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export interface OutageIncident {
  id: string;
  feederId: string;
  description: string;
  photoUrl?: string;
  status: IncidentStatus;
  priority: string;
  estimatedRestoration?: string;
  resolvedAt?: string;
  createdBy: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'billing.ts': `
export type BillStatus = 'UNPAID' | 'PAID' | 'OVERDUE';
export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Bill {
  id: string;
  userId: string;
  areaId: string;
  month: string;
  amount: number;
  surcharge: number;
  totalAmount: number;
  dueDate: string;
  status: BillStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  billId: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId?: string;
  stripePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}
`,
  'admin.ts': `
export interface DashboardStats {
  users: { total: number; byRole: Record<string, number> };
  outages: { active: number; reportedToday: number; resolvedToday: number };
  schedules: { active: number; upcoming: number; completedThisMonth: number };
  billing: { revenueThisMonth: number; paid: number; overdue: number };
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: any;
  ipAddress?: string;
  createdAt: string;
}
`
};

Object.keys(types).forEach(filename => {
  fs.writeFileSync(path.join(typesDir, filename), types[filename].trim());
});

console.log('Types generated.');
