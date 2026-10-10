'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Warning, Calendar, CurrencyCircleDollar } from '@phosphor-icons/react';
import { DashboardStats as IDashboardStats } from '@/lib/types/admin';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatsProps {
  stats?: IDashboardStats;
  isLoading: boolean;
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-3 w-[120px] mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">{stats.users.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.users.byRole.CUSTOMER || 0} Customers, {stats.users.byRole.OPERATOR || 0} Operators
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          <Warning className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono text-destructive">{stats.outages.active}</div>
          <p className="text-xs text-muted-foreground">
            {stats.outages.reportedToday} reported today, {stats.outages.resolvedToday} resolved
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Schedules</CardTitle>
          <Calendar className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono text-amber-500">{stats.schedules.active}</div>
          <p className="text-xs text-muted-foreground">
            {stats.schedules.upcoming} upcoming, {stats.schedules.completedThisMonth} completed this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
          <CurrencyCircleDollar className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono text-emerald-500">
            ৳ {stats.billing.revenueThisMonth.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.billing.paid} paid bills, {stats.billing.overdue} overdue
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
