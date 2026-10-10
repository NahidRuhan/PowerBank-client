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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, AlertTriangle, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DataTablePagination } from '@/components/shared/data-table-pagination';

function BillingSummary({ bills }: { bills: any[] }) {
  const totalDue = bills.filter(b => b.status === 'ISSUED' || b.status === 'OVERDUE').reduce((acc, b) => acc + (b.amount || 0), 0);
  const totalPaid = bills.filter(b => b.status === 'PAID').reduce((acc, b) => acc + (b.amount || 0), 0);
  const totalOverdue = bills.filter(b => b.status === 'OVERDUE').reduce((acc, b) => acc + (b.amount || 0), 0);

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="bg-surface-raised border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-ink-secondary">Total Due</CardTitle>
          <DollarSign className="h-4 w-4 text-ink-tertiary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-ink-primary">${totalDue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card className="bg-surface-raised border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-ink-secondary">Total Paid</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-ink-primary">${totalPaid.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card className="bg-surface-raised border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-ink-secondary">Overdue</CardTitle>
          <AlertCircle className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-danger">${totalOverdue.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}

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
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Bills
                </Button>
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
        {!adminLoading && <BillingSummary bills={adminBills?.data || []} />}
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
      {!myLoading && <BillingSummary bills={myBills?.data || []} />}
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
