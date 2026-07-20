/*
 * guards/role.guard.spec.ts
 * Tests functional role authentication router guards.
 * Created: 2026-07-20
 */

import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { roleGuard } from './role.guard';
import { SettingsService } from '../services/settings.service';

describe('roleGuard', () => {
  let settingsService: SettingsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        provideRouter([])
      ]
    });
    settingsService = TestBed.inject(SettingsService);
    router = TestBed.inject(Router);
  });

  it('should allow navigation access if user has Administrator role', () => {
    settingsService.settings.set({
      profileName: 'Sarah Jenkins',
      profileEmail: 'sarah.j&#64;enterprise.com',
      accessRoles: ['Administrator'],
      emailNotifications: true,
      smsAlerts: false,
      dbBackups: true
    });

    const result = TestBed.runInInjectionContext(() => roleGuard(null as any, null as any));
    expect(result).toBeTrue();
  });

  it('should block navigation and redirect to forbidden if user lacks clearance roles', () => {
    const navigateSpy = spyOn(router, 'navigate');
    
    settingsService.settings.set({
      profileName: 'Sarah Jenkins',
      profileEmail: 'sarah.j&#64;enterprise.com',
      accessRoles: ['Billing Manager', 'Viewer'],
      emailNotifications: true,
      smsAlerts: false,
      dbBackups: true
    });

    const result = TestBed.runInInjectionContext(() => roleGuard(null as any, null as any));
    expect(result).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/forbidden']);
  });
});
