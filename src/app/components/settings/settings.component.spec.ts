/*
 * components/settings/settings.component.spec.ts
 * Tests reactive settings forms validations, autocomplete chips list adjustments, and submissions snackbars.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsComponent } from './settings.component';
import { SettingsService } from '../../services/settings.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SettingsComponent
      ],
      providers: [
        SettingsService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
  });

  it('should create settings component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form with loaded service configurations', () => {
    fixture.detectChanges();
    expect(component.settingsForm.get('profileName')?.value).toBe('Sarah Jenkins');
    expect(component.settingsForm.get('profileEmail')?.value).toBe('sarah.j@enterprise.com');
    expect(component.selectedRoles()).toContain('Administrator');
  });

  it('should show error indicators when name is empty', () => {
    fixture.detectChanges();
    const nameInput = component.settingsForm.get('profileName');
    
    nameInput?.setValue('');
    expect(nameInput?.valid).toBeFalse();
    expect(nameInput?.hasError('required')).toBeTrue();
  });

  it('should show validation error on malformed email address input', () => {
    fixture.detectChanges();
    const emailInput = component.settingsForm.get('profileEmail');
    
    emailInput?.setValue('invalid-email');
    expect(emailInput?.valid).toBeFalse();
    expect(emailInput?.hasError('email')).toBeTrue();
  });

  it('should support removing role clearance chips', () => {
    fixture.detectChanges();
    expect(component.selectedRoles()).toContain('Billing Manager');
    
    component.removeRole('Billing Manager');
    fixture.detectChanges();

    expect(component.selectedRoles()).not.toContain('Billing Manager');
  });

  it('should trigger saveSettings on service and open snackbar on valid submit', fakeAsync(() => {
    fixture.detectChanges();
    
    const saveSpy = spyOn(settingsService, 'saveSettings').and.callThrough();
    const snackBarSpy = spyOn(component['snackBar'], 'open').and.callThrough();
    
    component.settingsForm.patchValue({
      profileName: 'Sarah J. Jenkins',
      profileEmail: 'sarah.jenkins@enterprise.com'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(saveSpy).toHaveBeenCalled();
    expect(settingsService.saving()).toBeTrue();

    // Fast-forward simulated delay timeout (1000ms)
    tick(1000);
    flushMicrotasks();
    fixture.detectChanges();

    expect(settingsService.saving()).toBeFalse();
    expect(snackBarSpy).toHaveBeenCalledWith(
      'Settings saved successfully!',
      'Close',
      jasmine.any(Object)
    );
  }));
});
