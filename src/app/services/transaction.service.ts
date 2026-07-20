/*
 * services/transaction.service.ts
 * Manages invoice registries, search filters, and transaction models.
 * Connects to: transactions.component.ts
 * Created: 2026-07-20
 */

import { Injectable, signal } from '@angular/core';

export interface TransactionEntry {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  category: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Signals tracking dataset metrics
  transactions = signal<TransactionEntry[]>([]);
  loading = signal<boolean>(false);

  private mockTransactions: TransactionEntry[] = [
    { id: 'TX-1001', customerName: 'John Kowalski', date: '2026-07-19', amount: 350.00, status: 'Completed', category: 'SaaS Subscription', email: 'john.k&#64;gmail.com' },
    { id: 'TX-1002', customerName: 'Michael Chang', date: '2026-07-19', amount: 1250.50, status: 'Completed', category: 'Professional Services', email: 'm.chang&#64;techcorp.com' },
    { id: 'TX-1003', customerName: 'Emma Watson', date: '2026-07-18', amount: 89.99, status: 'Pending', category: 'Hardware Purchase', email: 'emma&#64;watson.org' },
    { id: 'TX-1004', customerName: 'Sofia Rossi', date: '2026-07-18', amount: 4500.00, status: 'Completed', category: 'Professional Services', email: 's.rossi&#64;consulting.it' },
    { id: 'TX-1005', customerName: 'Liam Johnson', date: '2026-07-17', amount: 15.00, status: 'Failed', category: 'SaaS Subscription', email: 'liam.j&#64;outlook.com' },
    { id: 'TX-1006', customerName: 'Aria Patel', date: '2026-07-17', amount: 620.00, status: 'Completed', category: 'Hardware Purchase', email: 'aria.patel&#64;patel.in' },
    { id: 'TX-1007', customerName: 'Lucas Dubois', date: '2026-07-16', amount: 189.50, status: 'Pending', category: 'SaaS Subscription', email: 'lucas.d&#64;dubois.fr' },
    { id: 'TX-1008', customerName: 'Olivia Martinez', date: '2026-07-16', amount: 950.00, status: 'Completed', category: 'Professional Services', email: 'olivia.m&#64;martinez.es' },
    { id: 'TX-1009', customerName: 'Henry Schmidt', date: '2026-07-15', amount: 110.00, status: 'Failed', category: 'Hardware Purchase', email: 'henry&#64;schmidt.de' },
    { id: 'TX-1010', customerName: 'Chloe Kim', date: '2026-07-15', amount: 420.00, status: 'Completed', category: 'SaaS Subscription', email: 'chloe.k&#64;kim.kr' }
  ];

  constructor() {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading.set(true);
    
    // Simulate server response delay
    setTimeout(() => {
      this.transactions.set(this.mockTransactions);
      this.loading.set(false);
    }, 800);
  }
}
