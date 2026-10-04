'use client';
import { useState } from 'react';
import { useQuotas } from '@/lib/api/hooks/use-quotas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { format } from 'date-fns';

export function QuotasTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuotas({ page, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  const items = Array.isArray(data?.data) ? data.data : (data?.data?.quotas || data?.data?.data || []);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
              <TableHead>Target MW</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((quota: import('@/lib/types/schedule').SheddingQuota) => (
              <TableRow key={quota.id}>
                <TableCell className="font-mono text-xs">{quota.id}</TableCell>
                <TableCell>{format(new Date(quota.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{quota.timeSlot}</TableCell>
                <TableCell className="font-mono">{quota.targetMW} MW</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination 
        page={page} 
        totalPages={data?.meta?.totalPages || data?.data?.meta?.totalPages || 1} 
        onPageChange={setPage} 
      />
    </div>
  );
}
