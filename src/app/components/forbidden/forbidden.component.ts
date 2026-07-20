/*
 * components/forbidden/forbidden.component.ts
 * Renders a visual Access Denied page displaying security permissions error feedback.
 * Connects to: services/settings.service.ts
 * Created: 2026-07-20
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Service Imports
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {
  settingsService = inject(SettingsService);

  // Getter mapping current user permissions
  get currentRoles(): string[] {
    return this.settingsService.settings().accessRoles;
  }
}
