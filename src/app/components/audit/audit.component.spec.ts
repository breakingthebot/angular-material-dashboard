/*
 * components/audit/audit.component.spec.ts
 * Tests timeline filter lookups, category selects, and details drawer activations.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AuditComponent } from './audit.component';
import { AuditService } from '../../services/audit.service';

describe('AuditComponent', () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;
  let auditService: AuditService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AuditComponent
      ],
      providers: [
        AuditService,
        provideRouter([]),
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    auditService = TestBed.inject(AuditService);
  });

  it('should create audit component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display complete timeline list by default', () => {
    fixture.detectChanges();
    const logsCount = auditService.logs().length;
    expect(component.filteredLogs().length).toBe(logsCount);
  });

  it('should filter items when category dropdown is set', () => {
    fixture.detectChanges();
    
    component.selectedCategory.set('Security');
    fixture.detectChanges();

    // Verify all filtered elements possess the category Security
    const results = component.filteredLogs();
    expect(results.length).toBeGreaterThan(0);
    results.forEach(log => {
      expect(log.category).toBe('Security');
    });
  });

  it('should filter items when severity dropdown is set', () => {
    fixture.detectChanges();

    component.selectedSeverity.set('Critical');
    fixture.detectChanges();

    const results = component.filteredLogs();
    expect(results.length).toBeGreaterThan(0);
    results.forEach(log => {
      expect(log.status).toBe('Critical');
    });
  });

  it('should filter items based on text search query input matches', () => {
    fixture.detectChanges();

    // Search by partial log details description
    component.searchQuery.set('Snapshot ID');
    fixture.detectChanges();

    const results = component.filteredLogs();
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('LOG-1002');
  });

  it('should open detail review drawer when clicking item card', () => {
    fixture.detectChanges();
    expect(component.drawerOpen()).toBeFalse();
    expect(component.selectedLog()).toBeNull();

    const targetLog = auditService.logs()[2];
    component.selectLog(targetLog);
    fixture.detectChanges();

    expect(component.drawerOpen()).toBeTrue();
    expect(component.selectedLog()?.id).toBe(targetLog.id);
  });

  it('should close detail review drawer when trigger closes', () => {
    fixture.detectChanges();
    
    component.selectLog(auditService.logs()[0]);
    expect(component.drawerOpen()).toBeTrue();

    component.closeDrawer();
    fixture.detectChanges();

    expect(component.drawerOpen()).toBeFalse();
  });
});
