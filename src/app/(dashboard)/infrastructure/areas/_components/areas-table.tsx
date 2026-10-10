'use client';

import { useAreas, useDeleteArea } from '@/lib/api/hooks/use-areas';
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
import { Trash, PencilSimple, MapTrifold } from '@phosphor-icons/react';
import Link from 'next/link';
import { Area } from '@/lib/types/infrastructure';
import { useState } from 'react';
import { AreaFormDialog } from './area-form';
import { PriorityBadge } from '@/components/shared/priority-badge';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';

export function AreasTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAreas({ page, limit: 10 });
  const deleteMutation = useDeleteArea();
  
  const [editingArea, setEditingArea] = useState<Area | null>(null);
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

  const areas = data?.data || [];
  const meta = data?.meta;

  if (areas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center mb-4 text-ink-secondary">
          <MapTrifold size={24} />
        </div>
        <h3 className="text-lg font-medium text-ink-primary">No areas found</h3>
        <p className="text-sm text-ink-secondary mt-1">Create your first area to get started.</p>
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
            <TableHead>Priority</TableHead>
            <TableHead>Customers</TableHead>
            <TableHead>Feeder</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area: any) => (
            <TableRow key={area.id}>
              <TableCell className="font-mono font-medium">{area.code}</TableCell>
              <TableCell>
                <Link href={`/infrastructure/areas/${area.id}`} className="hover:underline text-accent">
                  {area.name}
                </Link>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={area.priority} />
              </TableCell>
              <TableCell className="font-mono">{area.customerCount}</TableCell>
              <TableCell className="text-ink-secondary">{area.feeder?.name || area.feederId}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingArea(area)}
                >
                  <PencilSimple size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-danger hover:text-danger hover:bg-danger-muted/20"
                  onClick={() => setItemToDelete(area.id)}
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
      
      {editingArea && (
        <AreaFormDialog 
          open={!!editingArea} 
          onOpenChange={(open) => !open && setEditingArea(null)}
          area={editingArea}
        />
      )}
      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete Area"
        description="Are you sure you want to delete this area? This action cannot be undone."
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
