'use client';

import { PageHeader } from '@/components/shared/page-header';
import { useDashboardStats } from '@/lib/api/hooks/use-admin';
import { DashboardStats } from './_components/dashboard-stats';
import { OutageChart } from './_components/outage-chart';
import { RevenueChart } from './_components/revenue-chart';
import { TopAffectedAreas } from './_components/top-affected-areas';
import { FairnessChart } from './_components/fairness-chart';

export default function AdminDashboardPage() {
  const { data: statsResponse, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        description="System overview and key performance metrics"
      />

      <DashboardStats stats={statsResponse?.data} isLoading={isLoading} />

      <div className="grid gap-4 md:grid-cols-2">
        <OutageChart />
        <RevenueChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopAffectedAreas />
        <FairnessChart />
      </div>
    </div>
  );
}
