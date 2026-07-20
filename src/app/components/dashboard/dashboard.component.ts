/*
 * components/dashboard/dashboard.component.ts
 * Displays overview analytics metrics and status summaries.
 * Created: 2026-07-20
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-viewport">
      <div class="page-header">
        <h1>Overview</h1>
        <p>Welcome back, Sarah. Here is your operational summary for today.</p>
      </div>
      <div class="temp-placeholder-card">
        <h3>Dashboard Widgets Grid</h3>
        <p>This section will contain the interactive KPI stats cards and status indicators in the next iteration.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header h1 {
      font-size: 2.1rem;
      font-weight: 800;
      letter-spacing: -0.8px;
      margin: 0 0 6px 0;
    }
    .page-header p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 500;
    }
    .temp-placeholder-card {
      margin-top: 24px;
      padding: 30px;
      background-color: var(--bg-secondary);
      border-radius: 12px;
      border: 1px dashed var(--border-color);
      color: var(--text-secondary);
      text-align: center;
    }
    .temp-placeholder-card h3 {
      color: var(--text-primary);
      margin: 0 0 8px 0;
    }
  `]
})
export class DashboardComponent {}
