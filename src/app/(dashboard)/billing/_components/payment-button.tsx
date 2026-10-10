'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInitiatePayment } from '@/lib/api/hooks/use-payments';
import { CreditCard } from 'lucide-react';

interface PaymentButtonProps {
  billId: string;
}

export function PaymentButton({ billId }: PaymentButtonProps) {
  const { mutate: initiatePayment, isPending } = useInitiatePayment();
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    initiatePayment(billId, {
      onSuccess: (data) => {
        // Redirect to Stripe checkout url
        if (data.data?.checkoutUrl) {
          window.location.href = data.data.checkoutUrl;
        } else if (data.checkoutUrl) { // Fallback if unwrapped differently
          // @ts-ignore
          window.location.href = data.checkoutUrl;
        } else {
          setLoading(false);
        }
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isPending || loading}
      className="bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      {isPending || loading ? 'Processing...' : 'Pay Now'}
    </Button>
  );
}
