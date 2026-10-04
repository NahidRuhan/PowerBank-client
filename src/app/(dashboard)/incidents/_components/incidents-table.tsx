'use client';
import { useState } from 'react';
import { useIncidents } from '@/lib/api/hooks/use-incidents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { PriorityBadge } from '@/components/shared/priority-badge';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function IncidentsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useIncidents({ page, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  const items = Array.isArray(data?.data) ? data.data : (data?.data?.incidents || data?.data?.data || []);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Feeder</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ERT</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((incident: import('@/lib/types/incident').OutageIncident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-mono">{incident.id.slice(0, 8)}</TableCell>
                <TableCell className="font-mono">{incident.feederId}</TableCell>
                <TableCell><PriorityBadge priority={incident.priority || 'MEDIUM'} /></TableCell>
                <TableCell><StatusBadge status={incident.status} /></TableCell>
                <TableCell>{incident.estimatedRestoration ? format(new Date(incident.estimatedRestoration), 'MMM d, HH:mm') : 'Not set'}</TableCell>
                <TableCell>
                  <Link href={`/incidents/${incident.id}`}>
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
        totalPages={data?.meta?.totalPages || data?.data?.meta?.totalPages || 1} 
        onPageChange={setPage} 
      />
    </div>
  );
}
