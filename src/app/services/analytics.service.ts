/*
 * services/analytics.service.ts
 * Manages administrative financial history models and data streams.
 * Connects to: analytics.component.ts
 * Created: 2026-07-20
 */

import { Injectable, signal } from '@angular/core';

export interface DataPoint {
  label: string;
  revenue: number;
  expense: number;
}

export type TimeRange = '7days' | '30days' | '12months';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Signals tracking selected range and active line streams
  selectedRange = signal<TimeRange>('7days');
  showRevenue = signal<boolean>(true);
  showExpense = signal<boolean>(true);

  private datasets: Record<TimeRange, DataPoint[]> = {
    '7days': [
      { label: 'Mon', revenue: 1200, expense: 800 },
      { label: 'Tue', revenue: 1500, expense: 950 },
      { label: 'Wed', revenue: 900, expense: 700 },
      { label: 'Thu', revenue: 2200, expense: 1100 },
      { label: 'Fri', revenue: 1800, expense: 1000 },
      { label: 'Sat', revenue: 2500, expense: 1300 },
      { label: 'Sun', revenue: 3100, expense: 1200 }
    ],
    '30days': [
      { label: 'Week 1', revenue: 4500, expense: 3100 },
      { label: 'Week 2', revenue: 6200, expense: 3900 },
      { label: 'Week 3', revenue: 5800, expense: 3400 },
      { label: 'Week 4', revenue: 7100, expense: 4200 },
      { label: 'Week 5', revenue: 8500, expense: 4800 },
      { label: 'Week 6', revenue: 9200, expense: 5100 }
    ],
    '12months': [
      { label: 'Jan', revenue: 25000, expense: 18000 },
      { label: 'Feb', revenue: 28000, expense: 19500 },
      { label: 'Mar', revenue: 31000, expense: 21000 },
      { label: 'Apr', revenue: 29000, expense: 20000 },
      { label: 'May', revenue: 35000, expense: 24000 },
      { label: 'Jun', revenue: 42000, expense: 28000 },
      { label: 'Jul', revenue: 45000, expense: 30000 },
      { label: 'Aug', revenue: 43000, expense: 29000 },
      { label: 'Sep', revenue: 48000, expense: 32000 },
      { label: 'Oct', revenue: 52000, expense: 34000 },
      { label: 'Nov', revenue: 58000, expense: 38000 },
      { label: 'Dec', revenue: 62000, expense: 40000 }
    ]
  };

  // Signal returning active data points depending on range selection
  getCurrentDataPoints() {
    return this.datasets[this.selectedRange()];
  }
}
