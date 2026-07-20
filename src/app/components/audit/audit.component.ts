/*
 * components/audit/audit.component.ts
 * Integrates audit event records timeline with search filters and detail review drawers.
 * Connects to: services/audit.service.ts, audit.component.html
 * Created: 2026-07-20
 */

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

// Service Imports
import { AuditService, AuditLog } from '../../services/audit.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css'
})
export class AuditComponent {
  auditService = inject(AuditService);

  // Search filter signals
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');
  selectedSeverity = signal<string>('All');

  // Selected event details signal drawer
  selectedLog = signal<AuditLog | null>(null);
  drawerOpen = signal<boolean>(false);

  // Computed filtering logs matching all options
  filteredLogs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const sev = this.selectedSeverity();
    const allLogs = this.auditService.logs();

    return allLogs.filter(log => {
      // 1. Text lookup filter
      const matchesText = 
        log.id.toLowerCase().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.ipAddress.includes(query);

      // 2. Category selection filter
      const matchesCategory = cat === 'All' || log.category === cat;

      // 3. Severity selection filter
      const matchesSeverity = sev === 'All' || log.status === sev;

      return matchesText && matchesCategory && matchesSeverity;
    });
  });

  selectLog(log: AuditLog): void {
    this.selectedLog.set(log);
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  getIconForCategory(category: string): string {
    switch (category) {
      case 'Security': return 'security';
      case 'Settings': return 'settings';
      case 'Backup': return 'cloud_done';
      case 'System': return 'dns';
      default: return 'info';
    }
  }

  // Clean HTML entity back to visual symbol for display inside custom elements
  cleanDetails(details: string): string {
    return details.replace('&#64;', '@');
  }
}
