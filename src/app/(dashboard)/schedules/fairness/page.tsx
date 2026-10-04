'use client';
import { PageHeader } from '@/components/shared/page-header';
import { FairnessChart } from './_components/fairness-chart';

export default function FairnessPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Schedule Fairness" 
        description="System-wide feeder fairness analysis."
      />
      <div className="border rounded-lg p-6">
        <FairnessChart />
      </div>
    </div>
  );
}
