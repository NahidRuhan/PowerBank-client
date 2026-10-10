'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useBills, useMyBills, useProcessOverdueBills } from '@/lib/api/hooks/use-bills';
import { BillsTable } from './_components/bills-table';
import { PaymentHistory } from './_components/payment-history';
import { GenerateBillsForm } from './_components/generate-bills-form';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, AlertTriangle } from 'lucide-react';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

function AdminBillingView() {
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [adminPage, setAdminPage] = useState(1);
  const { mutate: processOverdue, isPending: isProcessing } = useProcessOverdueBills();
  const { data: adminBills, isLoading: adminLoading } = useBills({ page: adminPage, limit: 10 });

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Billing & Payments"
        description="Manage system-wide billing"
        action={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => processOverdue()}
              disabled={isProcessing}
              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              {isProcessing ? 'Processing...' : 'Process Overdue'}
            </Button>
            <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
              <DialogTrigger render={<Button />}>
                <Plus className="mr-2 h-4 w-4" />
                Generate Bills
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Bills</DialogTitle>
                  <DialogDescription>
                    Generate monthly bills for all active customers.
                  </DialogDescription>
                </DialogHeader>
                <GenerateBillsForm onSuccess={() => setIsGenerateOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        }
      />
      <div className="space-y-4">
        <BillsTable bills={adminBills?.data || []} isLoading={adminLoading} isAdmin={true} />
        {adminBills?.meta && (
          <DataTablePagination
            page={adminBills.meta.page}
            totalPages={adminBills.meta.totalPages || adminBills.meta.pages}
            onPageChange={setAdminPage}
          />
        )}
      </div>
    </div>
  );
}

function CustomerBillingView() {
  const [myPage, setMyPage] = useState(1);
  const { data: myBills, isLoading: myLoading } = useMyBills({ page: myPage, limit: 10 });

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Billing & Payments"
        description="View and pay your electricity bills"
      />
      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bills">My Bills</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="bills" className="space-y-4">
          <BillsTable bills={myBills?.data || []} isLoading={myLoading} isAdmin={false} />
          {myBills?.meta && (
            <DataTablePagination
              page={myBills.meta.page}
              totalPages={myBills.meta.totalPages || myBills.meta.pages}
              onPageChange={setMyPage}
            />
          )}
        </TabsContent>
        <TabsContent value="history">
          <PaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function BillingPage() {
  const { user } = useAuthStore();
  
  if (!user) return null; // or a loading skeleton

  const isAdmin = user.role === 'ADMIN';

  return isAdmin ? <AdminBillingView /> : <CustomerBillingView />;
}
