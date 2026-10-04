'use client';

import { useFeeders, useDeleteFeeder } from '@/lib/api/hooks/use-feeders';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash, PencilSimple, Plug } from '@phosphor-icons/react';
import Link from 'next/link';
import { Feeder } from '@/lib/types/infrastructure';
import { useState } from 'react';
import { FeederFormDialog } from './feeder-form';
import { FeederStatusToggle } from './feeder-status-toggle';
import { cn } from '@/lib/utils';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

export function FeedersTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFeeders({ page, limit: 10 });
  const deleteMutation = useDeleteFeeder();
  
  const [editingFeeder, setEditingFeeder] = useState<Feeder | null>(null);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const feeders = data?.data || [];
  const meta = data?.meta;

  if (feeders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center mb-4 text-ink-secondary">
          <Plug size={24} />
        </div>
        <h3 className="text-lg font-medium text-ink-primary">No feeders found</h3>
        <p className="text-sm text-ink-secondary mt-1">Create your first feeder to get started.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Load (MW)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Substation</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeders.map((feeder) => (
            <TableRow 
              key={feeder.id}
              className={cn(
                feeder.status === 'FAULT' && 'bg-danger-muted/20 hover:bg-danger-muted/30',
                feeder.status === 'LOAD_SHED' && 'bg-warning-muted/20 hover:bg-warning-muted/30'
              )}
            >
              <TableCell className="font-mono text-xs">{feeder.id}</TableCell>
              <TableCell className="font-mono font-medium">{feeder.code}</TableCell>
              <TableCell>
                <Link href={`/infrastructure/feeders/${feeder.id}`} className="hover:underline text-accent">
                  {feeder.name}
                </Link>
              </TableCell>
              <TableCell className="font-mono">{feeder.loadMW}</TableCell>
              <TableCell>
                <FeederStatusToggle feederId={feeder.id} currentStatus={feeder.status} />
              </TableCell>
              <TableCell className="text-ink-secondary">{feeder.substation?.name || feeder.substationId}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingFeeder(feeder)}
                >
                  <PencilSimple size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-danger hover:text-danger hover:bg-danger-muted/20"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this feeder?')) {
                      deleteMutation.mutate(feeder.id);
                    }
                  }}
                >
                  <Trash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {meta && (
        <DataTablePagination 
          page={meta.page}
          totalPages={meta.pages || meta.totalPages}
          onPageChange={setPage}
        />
      )}
      
      {editingFeeder && (
        <FeederFormDialog 
          open={!!editingFeeder} 
          onOpenChange={(open) => !open && setEditingFeeder(null)}
          feeder={editingFeeder}
        />
      )}
    </>
  );
}
