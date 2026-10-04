'use client';

import { useMeters, useDeleteMeter } from '@/lib/api/hooks/use-meters';
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
import { Trash, Gauge } from '@phosphor-icons/react';
import { useState } from 'react';
import { format } from 'date-fns';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

export function MetersTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMeters({ page, limit: 10 });
  const deleteMutation = useDeleteMeter();
  
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const meters = data?.data || [];
  const meta = data?.meta;

  if (meters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center mb-4 text-ink-secondary">
          <Gauge size={24} />
        </div>
        <h3 className="text-lg font-medium text-ink-primary">No meters found</h3>
        <p className="text-sm text-ink-secondary mt-1">Register a meter to an area to get started.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meter Number</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Assigned User</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meters.map((meter) => (
            <TableRow key={meter.id}>
              <TableCell className="font-mono font-medium">{meter.number}</TableCell>
              <TableCell className="text-ink-secondary">{meter.area?.name || meter.areaId}</TableCell>
              <TableCell className="text-ink-secondary">
                {meter.user ? <span className="font-medium">{meter.user.name}</span> : <span className="text-ink-tertiary italic">Unassigned</span>}
              </TableCell>
              <TableCell className="text-ink-secondary font-mono text-xs">
                {format(new Date(meter.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-danger hover:text-danger hover:bg-danger-muted/20"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this meter?')) {
                      deleteMutation.mutate(meter.id);
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
    </>
  );
}
