'use client';

import { useZones, useDeleteZone } from '@/lib/api/hooks/use-zones';
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
import { format } from 'date-fns';
import { Trash, PencilSimple, MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import { Zone } from '@/lib/types/infrastructure';
import { useState } from 'react';
import { ZoneFormDialog } from './zone-form';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';

export function ZonesTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useZones({ page, limit: 10 });
  const deleteMutation = useDeleteZone();
  
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
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

  const zones = data?.data || [];
  const meta = data?.meta;

  if (zones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center mb-4 text-ink-secondary">
          <MapPin size={24} />
        </div>
        <h3 className="text-lg font-medium text-ink-primary">No zones found</h3>
        <p className="text-sm text-ink-secondary mt-1">Create your first zone to get started.</p>
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
            <TableHead>Description</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((zone) => (
            <TableRow key={zone.id}>
              <TableCell className="font-mono font-medium">{zone.code}</TableCell>
              <TableCell>
                <Link href={`/infrastructure/zones/${zone.id}`} className="hover:underline text-accent">
                  {zone.name}
                </Link>
              </TableCell>
              <TableCell className="text-ink-secondary max-w-xs truncate">
                {zone.description || '-'}
              </TableCell>
              <TableCell className="text-ink-secondary font-mono text-xs">
                {format(new Date(zone.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingZone(zone)}
                >
                  <PencilSimple size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-danger hover:text-danger hover:bg-danger-muted/20"
                  onClick={() => setItemToDelete(zone.id)}
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
      
      {editingZone && (
        <ZoneFormDialog 
          open={!!editingZone} 
          onOpenChange={(open) => !open && setEditingZone(null)}
          zone={editingZone}
        />
      )}
      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete Zone"
        description="Are you sure you want to delete this zone? This action cannot be undone."
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
