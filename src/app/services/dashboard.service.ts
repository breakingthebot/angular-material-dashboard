/*
 * services/dashboard.service.ts
 * Manages administrative dashboard states and mocks backend latency.
 * Connects to: dashboard.component.ts
 * Created: 2026-07-20
 */

import { Injectable, signal } from '@angular/core';

export interface MetricEntry {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Signals mapping application states
  metrics = signal<MetricEntry[]>([]);
  loading = signal<boolean>(false);

  private mockData: MetricEntry[] = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+12.4%',
      isPositive: true,
      icon: 'payments'
    },
    {
      title: 'Weekly Active Users',
      value: '2,845',
      change: '+8.2%',
      isPositive: true,
      icon: 'people'
    },
    {
      title: 'Avg Transaction Value',
      value: '$159.20',
      change: '-3.5%',
      isPositive: false,
      icon: 'shopping_bag'
    },
    {
      title: 'Platform Error Rate',
      value: '0.04%',
      change: '-0.01%',
      isPositive: true, // positive because error rate decreased
      icon: 'dns'
    }
  ];

  constructor() {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.loading.set(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      // Add slight variances on reload to show interactive counts changing
      const randomizedMetrics = this.mockData.map(m => {
        if (m.title === 'Total Revenue') {
          const val = 45231.89 + (Math.random() - 0.5) * 500;
          return { ...m, value: `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` };
        }
        if (m.title === 'Weekly Active Users') {
          const val = Math.floor(2845 + (Math.random() - 0.5) * 100);
          return { ...m, value: val.toLocaleString() };
        }
        return m;
      });

      this.metrics.set(randomizedMetrics);
      this.loading.set(false);
    }, 1000);
  }
}
