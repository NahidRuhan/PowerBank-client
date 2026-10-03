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
  changes?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}