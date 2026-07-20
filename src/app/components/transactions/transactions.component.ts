/*
 * components/transactions/transactions.component.ts
 * Integrates paginated registries, header sorting triggers, and selection drawers.
 * Connects to: services/transaction.service.ts, transactions.component.html
 * Created: 2026-07-20
 */

import { Component, OnInit, ViewChild, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

// Service Imports
import { TransactionService, TransactionEntry } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  private transactionService = inject(TransactionService);

  // Table binding data sources
  dataSource = new MatTableDataSource<TransactionEntry>([]);
  displayedColumns: string[] = ['id', 'customerName', 'date', 'amount', 'status', 'actions'];

  // Detail panel drawer state
  selectedTransaction = signal<TransactionEntry | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Reactively update dataSource when transactions signal changes
    effect(() => {
      this.dataSource.data = this.transactionService.transactions();
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    // Setup custom filter query parsing to look at customer name and status
    this.dataSource.filterPredicate = (data: TransactionEntry, filter: string) => {
      const matchName = data.customerName.toLowerCase().includes(filter);
      const matchId = data.id.toLowerCase().includes(filter);
      const matchStatus = data.status.toLowerCase().includes(filter);
      return matchName || matchId || matchStatus;
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectTransaction(tx: TransactionEntry): void {
    this.selectedTransaction.set(tx);
  }

  clearSelection(): void {
    this.selectedTransaction.set(null);
  }
}
