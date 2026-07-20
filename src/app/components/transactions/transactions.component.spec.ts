/*
 * components/transactions/transactions.component.spec.ts
 * Tests invoice list rendering, filter applications, and selection card drawers.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TransactionsComponent } from './transactions.component';
import { TransactionService, TransactionEntry } from '../../services/transaction.service';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let transactionService: TransactionService;

  const mockTransactions: TransactionEntry[] = [
    { id: 'TX-1001', customerName: 'John Kowalski', date: '2026-07-19', amount: 350.00, status: 'Completed', category: 'SaaS Subscription', email: 'john.k&#64;gmail.com' },
    { id: 'TX-1002', customerName: 'Michael Chang', date: '2026-07-19', amount: 1250.50, status: 'Completed', category: 'Professional Services', email: 'm.chang&#64;techcorp.com' },
    { id: 'TX-1003', customerName: 'Emma Watson', date: '2026-07-18', amount: 89.99, status: 'Pending', category: 'Hardware Purchase', email: 'emma&#64;watson.org' },
    { id: 'TX-1004', customerName: 'Sofia Rossi', date: '2026-07-18', amount: 4500.00, status: 'Completed', category: 'Professional Services', email: 's.rossi&#64;consulting.it' },
    { id: 'TX-1005', customerName: 'Liam Johnson', date: '2026-07-17', amount: 15.00, status: 'Failed', category: 'SaaS Subscription', email: 'liam.j&#64;outlook.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsComponent],
      providers: [
        TransactionService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
  });

  it('should create transactions component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render transaction rows inside the table', () => {
    // Set the signal to update the datasource reactively
    transactionService.transactions.set(mockTransactions);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('.clickable-row');
    expect(rows.length).toBe(5);

    const firstRowId = compiled.querySelector('.bold-id')?.textContent;
    expect(firstRowId).toContain('TX-1001');
  });

  it('should filter transaction rows matching search input', () => {
    transactionService.transactions.set(mockTransactions);
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('.search-field input') as HTMLInputElement;
    inputElement.value = 'Failed';
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('.clickable-row');
    // There is 1 failed transaction in our mockTransactions (TX-1005)
    expect(rows.length).toBe(1);
  });

  it('should display detail drawer card when a row is clicked', () => {
    transactionService.transactions.set(mockTransactions);
    fixture.detectChanges();

    expect(component.selectedTransaction()).toBeNull();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Select the first row element
    const firstRow = compiled.querySelector('.clickable-row') as HTMLTableRowElement;
    expect(firstRow).toBeTruthy();

    firstRow.click();
    fixture.detectChanges();

    // Verify transaction signal is set
    expect(component.selectedTransaction()?.id).toBe('TX-1001');

    // Verify detail drawer renders
    const detailCard = compiled.querySelector('.detail-card');
    expect(detailCard).toBeTruthy();
    
    const bannerId = compiled.querySelector('.banner-id')?.textContent;
    expect(bannerId).toContain('TX-1001');
  });

  it('should clear selection when close button is clicked', () => {
    transactionService.transactions.set(mockTransactions);
    fixture.detectChanges();
    
    component.selectedTransaction.set(mockTransactions[0]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const closeBtn = compiled.querySelector('.close-drawer-btn') as HTMLButtonElement;
    expect(closeBtn).toBeTruthy();

    closeBtn.click();
    fixture.detectChanges();

    expect(component.selectedTransaction()).toBeNull();
  });
});
