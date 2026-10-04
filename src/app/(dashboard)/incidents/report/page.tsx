'use client';
import { PageHeader } from '@/components/shared/page-header';
import { IncidentForm } from '../_components/incident-form';

export default function ReportIncidentPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <PageHeader 
        title="Report Outage" 
        description="Submit a new outage report for your area."
      />
      <div className="border rounded-lg p-6">
        <IncidentForm />
      </div>
    </div>
  );
}
