'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { AreasTable } from './_components/areas-table';
import { AreaFormDialog } from './_components/area-form';

export default function AreasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Areas" 
        description="Manage consumer areas and priority levels."
        action={
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus weight="bold" />
            Create Area
          </Button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <AreasTable />
      </div>

      <AreaFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
