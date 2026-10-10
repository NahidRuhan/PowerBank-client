'use client';
import { PageHeader } from '@/components/shared/page-header';
import { IncidentsTable } from './_components/incidents-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';

export default function IncidentsPage() {
  const user = useAuthStore((state) => state.user);
  const isCustomer = user?.role === 'CUSTOMER';

  return (
    <>
      <PageHeader 
        title="Incidents" 
        description="Manage and track outage reports and system incidents."
        action={
          isCustomer ? (
            <Link href="/incidents/report">
              <Button>Report Outage</Button>
            </Link>
          ) : null
        }
      />
      <div className="mt-6">
        <IncidentsTable />
      </div>
    </>
  );
}
