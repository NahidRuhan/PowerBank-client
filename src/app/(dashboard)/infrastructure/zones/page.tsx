'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { ZonesTable } from './_components/zones-table';
import { ZoneFormDialog } from './_components/zone-form';

export default function ZonesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Zones" 
        description="Manage high-level geographic regions."
        action={
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus weight="bold" />
            Create Zone
          </Button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <ZonesTable />
      </div>

      <ZoneFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
