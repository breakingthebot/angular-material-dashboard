/*
 * components/analytics/analytics.component.ts
 * Plot financial charts, legend controls, and custom SVG line drawings.
 * Connects to: services/analytics.service.ts, analytics.component.html
 * Created: 2026-07-20
 */

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Service Imports
import { AnalyticsService, TimeRange } from '../../services/analytics.service';

export interface SVGPoint {
  x: number;
  y: number;
  value: number;
  label: string;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  analyticsService = inject(AnalyticsService);

  // SVG Dimension Constants
  width = 640;
  height = 340;
  paddingLeft = 70;
  paddingRight = 20;
  paddingTop = 30;
  paddingBottom = 50;

  // Tooltip position state
  hoveredPoint = signal<{
    x: number;
    y: number;
    label: string;
    value: number;
    type: 'Revenue' | 'Expense';
  } | null>(null);

  // Computed layout calculations
  chartPoints = computed(() => {
    const data = this.analyticsService.getCurrentDataPoints();
    if (!data || data.length === 0) return { revenue: [], expense: [], gridY: [] };

    const rawValues = data.flatMap(d => [d.revenue, d.expense]);
    const maxVal = Math.max(...rawValues) * 1.15; // 15% head padding
    const minVal = 0;

    const plottingWidth = this.width - this.paddingLeft - this.paddingRight;
    const plottingHeight = this.height - this.paddingTop - this.paddingBottom;

    // Calculate Y axis ticks
    const gridY = [0, 0.25, 0.5, 0.75, 1.0].map(ratio => {
      const val = minVal + ratio * (maxVal - minVal);
      const y = (this.height - this.paddingBottom) - ratio * plottingHeight;
      return { y, label: `$${Math.round(val).toLocaleString()}` };
    });

    const revenue = data.map((d, i) => {
      const x = this.paddingLeft + (i / (data.length - 1)) * plottingWidth;
      const y = (this.height - this.paddingBottom) - ((d.revenue - minVal) / (maxVal - minVal)) * plottingHeight;
      return { x, y, value: d.revenue, label: d.label };
    });

    const expense = data.map((d, i) => {
      const x = this.paddingLeft + (i / (data.length - 1)) * plottingWidth;
      const y = (this.height - this.paddingBottom) - ((d.expense - minVal) / (maxVal - minVal)) * plottingHeight;
      return { x, y, value: d.expense, label: d.label };
    });

    return { revenue, expense, gridY };
  });

  // Polyline string generators
  revenuePolyline = computed(() => {
    return this.chartPoints().revenue.map(p => `${p.x},${p.y}`).join(' ');
  });

  expensePolyline = computed(() => {
    return this.chartPoints().expense.map(p => `${p.x},${p.y}`).join(' ');
  });

  // Range and filter handlers
  onRangeChange(range: TimeRange): void {
    this.analyticsService.selectedRange.set(range);
    this.clearHover();
  }

  toggleStream(type: 'revenue' | 'expense'): void {
    if (type === 'revenue') {
      this.analyticsService.showRevenue.update(v => !v);
    } else {
      this.analyticsService.showExpense.update(v => !v);
    }
    this.clearHover();
  }

  // Hover nodes tooltip triggers
  setHoverPoint(point: SVGPoint, type: 'Revenue' | 'Expense'): void {
    this.hoveredPoint.set({
      x: point.x,
      y: point.y,
      label: point.label,
      value: point.value,
      type
    });
  }

  clearHover(): void {
    this.hoveredPoint.set(null);
  }
}
