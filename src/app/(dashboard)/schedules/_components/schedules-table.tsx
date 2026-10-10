'use client';
import { useState } from 'react';
import { useSchedules } from '@/lib/api/hooks/use-schedules';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

export function SchedulesTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSchedules({ page, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  const items = Array.isArray((data as any)?.data) ? (data as any).data : ((data as any)?.data?.schedules || (data as any)?.data?.data || []);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feeder</TableHead>
              <TableHead>Load</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((schedule: import('@/lib/types/schedule').ScheduledOutage) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-mono">{schedule.feederId}</TableCell>
                <TableCell className="font-mono text-ink-secondary">{schedule.feeder?.loadMW ? `${schedule.feeder.loadMW} MW` : '—'}</TableCell>
                <TableCell>{format(new Date(schedule.startTime), 'MMM d, HH:mm')}</TableCell>
                <TableCell>{format(new Date(schedule.endTime), 'MMM d, HH:mm')}</TableCell>
                <TableCell>
                  <StatusBadge status={schedule.status} />
                </TableCell>
                <TableCell>{schedule.reason}</TableCell>
                <TableCell>
                  <Link href={`/schedules/${schedule.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination 
        page={page} 
        totalPages={(data as any)?.meta?.pages || (data as any)?.data?.meta?.pages || 1} 
        onPageChange={setPage} 
      />
    </div>
  );
}
