'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from '@phosphor-icons/react';
import { FeedersTable } from './_components/feeders-table';
import { FeederFormDialog } from './_components/feeder-form';

export default function FeedersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Feeders" 
        description="Manage feeders and monitor their operational status."
        action={
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus weight="bold" />
            Create Feeder
          </Button>
        }
      />
      
      <div className="bg-surface rounded-xl border border-border overflow-hidden">
        <FeedersTable />
      </div>

      <FeederFormDialog 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
