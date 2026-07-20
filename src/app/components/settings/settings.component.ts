/*
 * components/settings/settings.component.ts
 * Integrates reactive user settings forms, autocomplete role chips, and notifications saving snackbars.
 * Connects to: services/settings.service.ts, settings.component.html
 * Created: 2026-07-20
 */

import { Component, inject, signal, ElementRef, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

// Service Imports
import { SettingsService, UserSettings } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  settingsService = inject(SettingsService);

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  // Local signal tracking role chips
  selectedRoles = signal<string[]>([]);
  roleCtrl = new FormControl('');
  
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  // Computed signal filtering available roles based on input query
  filteredRoles = computed(() => {
    const filterValue = (this.roleCtrl.value || '').toLowerCase();
    const allRoles = this.settingsService.availableRoles;
    const selected = this.selectedRoles();
    
    return allRoles.filter(role => 
      role.toLowerCase().includes(filterValue) && !selected.includes(role)
    );
  });

  // Reactive Form Group
  settingsForm: FormGroup;

  constructor() {
    const currentSettings = this.settingsService.settings();
    
    // Clean up raw HTML entities back to readable @ signs for input editing
    const cleanEmail = currentSettings.profileEmail.replace('&#64;', '@');
    
    this.selectedRoles.set([...currentSettings.accessRoles]);

    this.settingsForm = this.fb.group({
      profileName: [currentSettings.profileName, [Validators.required, Validators.minLength(2)]],
      profileEmail: [cleanEmail, [Validators.required, Validators.email]],
      emailNotifications: [currentSettings.emailNotifications],
      smsAlerts: [currentSettings.smsAlerts],
      dbBackups: [currentSettings.dbBackups]
    });
  }

  // Chip adding event (only allow if it is a valid available role)
  addRole(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const available = this.settingsService.availableRoles;

    if (value && available.includes(value) && !this.selectedRoles().includes(value)) {
      this.selectedRoles.update(roles => [...roles, value]);
    }

    event.chipInput!.clear();
    this.roleCtrl.setValue(null);
  }

  // Chip removing event
  removeRole(role: string): void {
    this.selectedRoles.update(roles => roles.filter(r => r !== role));
  }

  // Selection auto-complete event
  selectedRole(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.selectedRoles().includes(value)) {
      this.selectedRoles.update(roles => [...roles, value]);
    }
    
    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  // Form submit handler
  onSubmit(): void {
    if (this.settingsForm.invalid || this.settingsService.saving()) {
      return;
    }

    // Map email input back to HTML escaped entities
    const rawEmail = this.settingsForm.value.profileEmail;
    const escapedEmail = rawEmail.replace('@', '&#64;');

    const payload: UserSettings = {
      profileName: this.settingsForm.value.profileName,
      profileEmail: escapedEmail,
      accessRoles: this.selectedRoles(),
      emailNotifications: this.settingsForm.value.emailNotifications,
      smsAlerts: this.settingsForm.value.smsAlerts,
      dbBackups: this.settingsForm.value.dbBackups
    };

    this.settingsService.saveSettings(payload).then(() => {
      this.snackBar.open('Settings saved successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    });
  }
}
