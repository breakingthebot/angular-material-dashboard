/*
 * components/dashboard/dashboard.component.ts
 * Integrates dashboard KPI cards, loading skeleton signals, and layout widgets.
 * Connects to: services/dashboard.service.ts, dashboard.component.html
 * Created: 2026-07-20
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// Service Imports
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Inject the reactive metrics service
  dashboardService = inject(DashboardService);

  // Expose signals for template binding
  metrics = this.dashboardService.metrics;
  isLoading = this.dashboardService.loading;

  refreshDashboard(): void {
    this.dashboardService.loadMetrics();
  }
}
