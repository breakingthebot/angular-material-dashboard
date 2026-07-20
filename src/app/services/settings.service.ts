/*
 * services/settings.service.ts
 * Manages administrative settings parameters and autocomplete roles.
 * Connects to: settings.component.ts
 * Created: 2026-07-20
 */

import { Injectable, signal } from '@angular/core';

export interface UserSettings {
  profileName: string;
  profileEmail: string;
  accessRoles: string[];
  emailNotifications: boolean;
  smsAlerts: boolean;
  dbBackups: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Signals mapping application configurations
  settings = signal<UserSettings>({
    profileName: 'Sarah Jenkins',
    profileEmail: 'sarah.j&#64;enterprise.com',
    accessRoles: ['Administrator', 'Billing Manager'],
    emailNotifications: true,
    smsAlerts: false,
    dbBackups: true
  });

  // Autocomplete roles list
  availableRoles: string[] = [
    'Administrator',
    'Editor',
    'Viewer',
    'Billing Manager',
    'Security Officer',
    'Developer'
  ];

  saving = signal<boolean>(false);

  saveSettings(newSettings: UserSettings): Promise<boolean> {
    this.saving.set(true);
    
    // Simulate gateway API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        this.settings.set(newSettings);
        this.saving.set(false);
        resolve(true);
      }, 1000);
    });
  }
}
