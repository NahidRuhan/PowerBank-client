'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { SubstationsTable } from './_components/substations-table';
import { SubstationFormDialog } from './_components/substation-form';

export default function SubstationsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Substations" 
        description="Manage high-voltage substations inside your zones."
        action={
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus weight="bold" />
            Create Substation
          </Button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <SubstationsTable />
      </div>

      <SubstationFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
