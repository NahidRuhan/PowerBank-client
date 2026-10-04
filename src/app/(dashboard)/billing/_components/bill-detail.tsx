'use client';

import { Bill } from '@/lib/types/billing';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/shared/status-badge';
import { PaymentButton } from './payment-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BillDetailProps {
  bill: Bill;
  isAdmin?: boolean;
}

export function BillDetail({ bill, isAdmin }: BillDetailProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Bill Details</CardTitle>
            <CardDescription>
              Billing cycle: {bill.month}
            </CardDescription>
          </div>
          <StatusBadge status={bill.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Bill ID</p>
            <p className="font-mono">{bill.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{format(new Date(bill.dueDate), 'MMMM d, yyyy')}</p>
          </div>
          {isAdmin && (
            <>
              <div>
                <p className="text-muted-foreground">User ID</p>
                <p className="font-mono">{bill.userId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Area ID</p>
                <p className="font-mono">{bill.areaId}</p>
              </div>
            </>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Amount</span>
            <span className="font-mono">BDT {bill.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Surcharge (Late Fee)</span>
            <span className="font-mono">BDT {bill.surcharge.toLocaleString()}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="font-mono">BDT {bill.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      {!isAdmin && bill.status !== 'PAID' && (
        <CardFooter className="flex justify-end bg-muted/50 p-6">
          <PaymentButton billId={bill.id} />
        </CardFooter>
      )}
    </Card>
  );
}
