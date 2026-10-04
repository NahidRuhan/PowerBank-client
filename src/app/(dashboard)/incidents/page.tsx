'use client';
import { PageHeader } from '@/components/shared/page-header';
import { IncidentsTable } from './_components/incidents-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function IncidentsPage() {
  return (
    <>
      <PageHeader 
        title="Incidents" 
        description="Manage and track outage reports and system incidents."
        action={
          <Link href="/incidents/report">
            <Button>Report Outage</Button>
          </Link>
        }
      />
      <div className="mt-6">
        <IncidentsTable />
      </div>
    </>
  );
}
