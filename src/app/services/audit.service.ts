/*
 * services/audit.service.ts
 * Manages administrative audit log telemetry and status events.
 * Connects to: audit.component.ts
 * Created: 2026-07-20
 */

import { Injectable, signal } from '@angular/core';

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  category: 'Security' | 'Settings' | 'Backup' | 'System';
  action: string;
  status: 'Info' | 'Warning' | 'Critical';
  ipAddress: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  // Activity audit entries representing historical logs
  logs = signal<AuditLog[]>([
    {
      id: 'LOG-1001',
      timestamp: '2026-07-20 17:34:12',
      user: 'Sarah Jenkins',
      category: 'Settings',
      action: 'Profile email updated',
      status: 'Info',
      ipAddress: '192.168.1.45',
      details: 'Changed profile email address to sarah.j&#64;enterprise.com.'
    },
    {
      id: 'LOG-1002',
      timestamp: '2026-07-20 16:20:00',
      user: 'System Agent',
      category: 'Backup',
      action: 'Database snapshot completed',
      status: 'Info',
      ipAddress: '127.0.0.1',
      details: 'Daily cluster backup finalized successfully. Snapshot ID: snap-90812.'
    },
    {
      id: 'LOG-1003',
      timestamp: '2026-07-20 15:10:45',
      user: 'Unknown User',
      category: 'Security',
      action: 'Failed console login attempt',
      status: 'Warning',
      ipAddress: '198.51.100.12',
      details: 'Failed authentication request targeting console interface. User: root.'
    },
    {
      id: 'LOG-1004',
      timestamp: '2026-07-20 14:00:22',
      user: 'Sarah Jenkins',
      category: 'Security',
      action: 'API Key revoked',
      status: 'Critical',
      ipAddress: '192.168.1.45',
      details: 'Production API access credentials (token: ...a3e9) manually revoked.'
    },
    {
      id: 'LOG-1005',
      timestamp: '2026-07-20 11:45:00',
      user: 'System Monitor',
      category: 'System',
      action: 'Memory usage exceeded 90%',
      status: 'Warning',
      ipAddress: '10.0.0.4',
      details: 'Primary server node reached 92% RAM usage threshold. Garbage collection triggered.'
    },
    {
      id: 'LOG-1006',
      timestamp: '2026-07-20 09:30:15',
      user: 'Sarah Jenkins',
      category: 'Settings',
      action: 'Access roles modified',
      status: 'Info',
      ipAddress: '192.168.1.45',
      details: 'Granted billing manager role clearance parameters.'
    },
    {
      id: 'LOG-1007',
      timestamp: '2026-07-20 08:00:00',
      user: 'System Agent',
      category: 'Backup',
      action: 'Weekly backup cleanup executed',
      status: 'Info',
      ipAddress: '127.0.0.1',
      details: 'Pruned obsolete database backup files older than 30 days.'
    }
  ]);
}
