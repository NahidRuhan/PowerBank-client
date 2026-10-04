'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Bill } from '@/lib/types/billing';
import { StatusBadge } from '@/components/shared/status-badge';
import { format } from 'date-fns';
import { PaymentButton } from './payment-button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface BillsTableProps {
  bills: Bill[];
  isLoading?: boolean;
  isAdmin?: boolean;
}

export function BillsTable({ bills, isLoading, isAdmin }: BillsTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (bills.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">No bills found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {isAdmin && <TableHead>User ID</TableHead>}
            <TableHead>Month</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              {isAdmin && (
                <TableCell className="font-medium">
                  {bill.userId.slice(0, 8)}...
                </TableCell>
              )}
              <TableCell>{bill.month}</TableCell>
              <TableCell className="font-mono">
                BDT {bill.totalAmount.toLocaleString()}
              </TableCell>
              <TableCell>
                {format(new Date(bill.dueDate), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <StatusBadge status={bill.status} />
              </TableCell>
              <TableCell className="text-right flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" render={<Link href={`/billing/${bill.id}`} />} nativeButton={false}>
                  View
                </Button>
                {!isAdmin && bill.status !== 'PAID' && (
                  <PaymentButton billId={bill.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
