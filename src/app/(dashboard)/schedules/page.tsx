'use client';
import { PageHeader } from '@/components/shared/page-header';
import { SchedulesTable } from './_components/schedules-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScheduleForm } from './_components/schedule-form';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function SchedulesPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader 
        title="Schedules" 
        description="Manage load shedding schedules across all feeders."
        action={
          <div className="flex gap-2">
            <Link href="/schedules/fairness">
              <Button variant="outline">Fairness View</Button>
            </Link>
            <Link href="/schedules/quotas">
              <Button variant="outline">Manage Quotas</Button>
            </Link>
            <Button onClick={() => setOpen(true)}>Create Schedule</Button>
          </div>
        }
      />
      <div className="mt-6">
        <SchedulesTable />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Schedule</DialogTitle>
          </DialogHeader>
          <ScheduleForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
