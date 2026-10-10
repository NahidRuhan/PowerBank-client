'use client';

import { useSubstations, useDeleteSubstation } from '@/lib/api/hooks/use-substations';
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
import { Trash, PencilSimple, Lightning } from '@phosphor-icons/react';
import Link from 'next/link';
import { Substation } from '@/lib/types/infrastructure';
import { useState } from 'react';
import { SubstationFormDialog } from './substation-form';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';

export function SubstationsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSubstations({ page, limit: 10 });
  const deleteMutation = useDeleteSubstation();
  
  const [editingSubstation, setEditingSubstation] = useState<Substation | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const substations = data?.data || [];
  const meta = data?.meta;

  if (substations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center mb-4 text-ink-secondary">
          <Lightning size={24} />
        </div>
        <h3 className="text-lg font-medium text-ink-primary">No substations found</h3>
        <p className="text-sm text-ink-secondary mt-1">Create your first substation to get started.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Capacity (MW)</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {substations.map((substation) => (
            <TableRow key={substation.id}>
              <TableCell className="font-mono font-medium">{substation.code}</TableCell>
              <TableCell>
                <Link href={`/infrastructure/substations/${substation.id}`} className="hover:underline text-accent">
                  {substation.name}
                </Link>
              </TableCell>
              <TableCell className="font-mono">{substation.capacityMW}</TableCell>
              <TableCell className="text-ink-secondary">{substation.zone?.name || substation.zoneId}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingSubstation(substation)}
                >
                  <PencilSimple size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-danger hover:text-danger hover:bg-danger-muted/20"
                  onClick={() => setItemToDelete(substation.id)}
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
      
      {editingSubstation && (
        <SubstationFormDialog 
          open={!!editingSubstation} 
          onOpenChange={(open) => !open && setEditingSubstation(null)}
          substation={editingSubstation}
        />
      )}
      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete Substation"
        description="Are you sure you want to delete this substation? This action cannot be undone."
        onConfirm={() => {
          if (itemToDelete) {
            deleteMutation.mutate(itemToDelete);
          }
        }}
        confirmText="Delete"
      />
    </>
  );
}
