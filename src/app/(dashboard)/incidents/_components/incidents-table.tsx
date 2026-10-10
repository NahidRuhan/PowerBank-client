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
import { Skeleton } from '@/components/ui/skeleton';

export function IncidentsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useIncidents({ page, limit: 10 });

  if (isLoading) {
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
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-14" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  const items = Array.isArray((data as any)?.data) ? (data as any).data : ((data as any)?.data?.incidents || (data as any)?.data?.data || []);

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
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No Data
                </TableCell>
              </TableRow>
            ) : (
              items.map((incident: import('@/lib/types/incident').OutageIncident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-mono">{incident.id.slice(0, 8)}</TableCell>
                  <TableCell>{(incident as any).feeder?.name || incident.feederId}</TableCell>
                  <TableCell><PriorityBadge priority={(incident.priority as any) || 'MEDIUM'} /></TableCell>
                  <TableCell><StatusBadge status={incident.status} /></TableCell>
                  <TableCell>{incident.estimatedRestoration ? format(new Date(incident.estimatedRestoration), 'MMM d, HH:mm') : 'Not set'}</TableCell>
                  <TableCell>
                    <Link href={`/incidents/${incident.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
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
