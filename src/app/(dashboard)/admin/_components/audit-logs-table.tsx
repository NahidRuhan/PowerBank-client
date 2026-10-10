'use client';

import React, { useState } from 'react';
import { useAuditLogs } from '@/lib/api/hooks/use-admin';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

export function AuditLogsTable() {
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useAuditLogs({ page, limit: 10 });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const logs = Array.isArray(response?.data) 
    ? response.data 
    : ((response as any)?.data?.logs || (response as any)?.data?.auditLogs || (response as any)?.data?.data || []);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="rounded-md border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead>IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                No audit logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log: any) => (
              <React.Fragment key={log.id}>
                <TableRow className={cn('cursor-pointer', expandedRow === log.id && 'bg-muted/50')} onClick={() => toggleRow(log.id)}>
                  <TableCell>
                    {log.changes ? (
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        {expandedRow === log.id ? <CaretDown /> : <CaretRight />}
                      </Button>
                    ) : null}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{log.userId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.action}</Badge>
                  </TableCell>
                  <TableCell>
                    {log.entity} <span className="text-muted-foreground text-xs font-mono ml-1">{log.entityId}</span>
                  </TableCell>
                  <TableCell className="text-xs">{log.ipAddress || '-'}</TableCell>
                </TableRow>
                {expandedRow === log.id && log.changes && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50 p-4">
                      <pre className="text-xs bg-background p-4 rounded-md overflow-x-auto border border-border">
                        {JSON.stringify(log.changes, null, 2)}
                      </pre>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
      <DataTablePagination 
        page={page} 
        totalPages={(response as any)?.pagination?.pages || (response as any)?.data?.pagination?.pages || (response as any)?.meta?.pages || (response as any)?.data?.meta?.pages || (response as any)?.meta?.totalPages || (response as any)?.data?.meta?.totalPages || 1}
        onPageChange={setPage} 
      />
    </div>
  );
}
