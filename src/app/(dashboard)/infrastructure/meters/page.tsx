'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { MetersTable } from './_components/meters-table';
import { MeterFormDialog } from './_components/meter-form';

export default function MetersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Meters" 
        description="Manage customer electricity meters."
        action={
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus weight="bold" />
            Create Meter
          </Button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <MetersTable />
      </div>

      <MeterFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
