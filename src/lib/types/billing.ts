export type BillStatus = 'UNPAID' | 'PAID' | 'OVERDUE';
export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface Bill {
  id: string;
  userId: string;
  areaId: string;
  month: string;
  amount: number;
  surcharge: number;
  totalAmount: number;
  dueDate: string;
  status: BillStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  billId: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId?: string;
  stripePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}