/*
 * components/forbidden/forbidden.component.spec.ts
 * Tests forbidden page mounting and current roles extraction logic.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ForbiddenComponent } from './forbidden.component';
import { SettingsService } from '../../services/settings.service';

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenComponent],
      providers: [
        SettingsService,
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
  });

  it('should create forbidden component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should list current user roles from SettingsService', () => {
    fixture.detectChanges();
    const rolesList = component.currentRoles;
    
    expect(rolesList).toContain('Administrator');
    expect(rolesList).toContain('Billing Manager');
  });
});
