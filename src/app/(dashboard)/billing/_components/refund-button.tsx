'use client';

import { Button } from '@/components/ui/button';
import { useRefundPayment } from '@/lib/api/hooks/use-payments';
import { RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RefundButtonProps {
  paymentId: string;
}

export function RefundButton({ paymentId }: RefundButtonProps) {
  const { mutate: refundPayment, isPending } = useRefundPayment();

  const handleRefund = () => {
    refundPayment(paymentId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" />}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Refund
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Process Refund?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will refund the payment to the user's original payment method via Stripe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleRefund} 
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
          >
            {isPending ? 'Processing...' : 'Confirm Refund'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
