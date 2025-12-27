export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  receipt?: string; // URL to receipt image
  createdAt: Date;
  updatedAt: Date;
}

export interface Revenue {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  issueDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface FinancialReport {
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  profitMargin: number;
  expensesByCategory: { category: string; amount: number }[];
  revenueByCategory: { category: string; amount: number }[];
}
