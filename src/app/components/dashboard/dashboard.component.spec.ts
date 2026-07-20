/*
 * components/dashboard/dashboard.component.spec.ts
 * Tests metric list rendering, refresh mock calls, and skeleton loader logic.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        DashboardService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
  });

  it('should create dashboard component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render skeleton cards while loading', fakeAsync(() => {
    // Force loading state
    dashboardService.loading.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const skeletonCards = compiled.querySelectorAll('.skeleton-card');
    expect(skeletonCards.length).toBe(4);
    
    // Release loading state
    tick(1000);
    fixture.detectChanges();
  }));

  it('should render metric KPI cards when loading finishes', fakeAsync(() => {
    // Initialize loading and wait for timeout
    dashboardService.loadMetrics();
    expect(dashboardService.loading()).toBe(true);
    
    tick(1000);
    fixture.detectChanges();

    expect(dashboardService.loading()).toBe(false);
    
    const compiled = fixture.nativeElement as HTMLElement;
    const metricCards = compiled.querySelectorAll('.metric-card');
    expect(metricCards.length).toBe(4);

    const firstCardTitle = compiled.querySelector('.card-title')?.textContent;
    expect(firstCardTitle).toContain('Total Revenue');
  }));

  it('should trigger refresh state on clicking the Sync button', fakeAsync(() => {
    fixture.detectChanges();
    tick(1000); // Complete initial load
    fixture.detectChanges();

    const loadSpy = spyOn(component.dashboardService, 'loadMetrics').and.callThrough();
    
    component.refreshDashboard();
    fixture.detectChanges();

    expect(loadSpy).toHaveBeenCalled();
    
    // Cleanup pending timer
    tick(1000);
  }));
});
