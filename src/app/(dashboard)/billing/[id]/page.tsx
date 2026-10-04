'use client';

import { useParams, useRouter } from 'next/navigation';
import { useBill } from '@/lib/api/hooks/use-bills';
import { useAuthStore } from '@/stores/auth-store';
import { BillDetail } from '../_components/bill-detail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';

  const { data, isLoading, error } = useBill(id);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-[400px] w-full max-w-2xl mx-auto" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-[50vh] space-y-4">
        <p className="text-muted-foreground">Bill not found or you don't have access.</p>
        <Button variant="outline" onClick={() => router.push('/billing')}>
          Back to Billing
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Button variant="ghost" onClick={() => router.push('/billing')} className="-ml-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Billing
      </Button>
      
      <BillDetail bill={data.data} isAdmin={isAdmin} />
    </div>
  );
}
