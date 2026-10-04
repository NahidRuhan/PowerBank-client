'use client';

import { useState } from 'react';
import { useMyPayments } from '@/lib/api/hooks/use-payments';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

export function PaymentHistory() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyPayments({ page, limit: 10 });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const payments = data?.data || [];

  if (payments.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <p className="text-sm text-muted-foreground">No payments found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  {format(new Date(payment.createdAt), 'MMM d, yyyy HH:mm')}
                </TableCell>
                <TableCell className="font-mono">
                  {payment.currency.toUpperCase()} {payment.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {payment.stripePaymentId || payment.id.slice(0, 12)}...
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data?.meta && (
        <DataTablePagination
          page={data.meta.page}
          totalPages={data.meta.totalPages || data.meta.pages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
