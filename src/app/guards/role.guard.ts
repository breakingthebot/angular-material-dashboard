/*
 * guards/role.guard.ts
 * Implements functional route protection based on active user settings roles.
 * Connects to: app.routes.ts, services/settings.service.ts
 * Created: 2026-07-20
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const settingsService = inject(SettingsService);
  const router = inject(Router);

  // Retrieve current active roles from user settings
  const currentRoles = settingsService.settings().accessRoles;
  
  // Guard access checking if user has security or admin credentials
  const hasAccess = currentRoles.includes('Security Officer') || currentRoles.includes('Administrator');

  if (hasAccess) {
    return true;
  }

  // Redirect unauthorized requests to the access-denied panel
  router.navigate(['/forbidden']);
  return false;
};
