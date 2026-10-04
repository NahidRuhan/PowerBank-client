'use client';
import { PageHeader } from '@/components/shared/page-header';
import { QuotasTable } from './_components/quotas-table';
import { Button } from '@/components/ui/button';
import { QuotaForm } from './_components/quota-form';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function QuotasPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quotas" 
        description="Manage load shedding quotas."
        action={<Button onClick={() => setOpen(true)}>Create Quota</Button>}
      />
      <QuotasTable />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Quota</DialogTitle>
          </DialogHeader>
          <QuotaForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
