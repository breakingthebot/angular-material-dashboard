/*
 * components/analytics/analytics.component.spec.ts
 * Tests SVG coordinate calculations, stream toggle controls, and hover tooltips.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsService } from '../../services/analytics.service';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [
        AnalyticsService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService);
  });

  it('should create analytics component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should compute grid lines and ticks matching viewport properties', () => {
    fixture.detectChanges();
    const points = component.chartPoints();
    
    // Expect 5 ticks based on Y grid configuration [0, 0.25, 0.5, 0.75, 1.0]
    expect(points.gridY.length).toBe(5);

    // Expect 7 data coordinates for 7 days default dataset
    expect(points.revenue.length).toBe(7);
    expect(points.expense.length).toBe(7);
  });

  it('should toggle stream visibility on check updates', () => {
    fixture.detectChanges();
    
    // Verify default active stream bindings
    expect(analyticsService.showRevenue()).toBe(true);
    expect(analyticsService.showExpense()).toBe(true);

    component.toggleStream('revenue');
    fixture.detectChanges();
    expect(analyticsService.showRevenue()).toBe(false);

    component.toggleStream('expense');
    fixture.detectChanges();
    expect(analyticsService.showExpense()).toBe(false);
  });

  it('should update hoveredPoint signal on node mouseenter triggers', () => {
    fixture.detectChanges();
    expect(component.hoveredPoint()).toBeNull();

    // Emulate hover over first coordinate
    const targetPoint = component.chartPoints().revenue[0];
    component.setHoverPoint(targetPoint, 'Revenue');
    fixture.detectChanges();

    const hoverState = component.hoveredPoint();
    expect(hoverState).toBeTruthy();
    expect(hoverState?.value).toBe(1200);
    expect(hoverState?.type).toBe('Revenue');

    // Dismiss hover
    component.clearHover();
    fixture.detectChanges();
    expect(component.hoveredPoint()).toBeNull();
  });

  it('should update service range setting on toggle select clicks', () => {
    fixture.detectChanges();
    expect(analyticsService.selectedRange()).toBe('7days');

    component.onRangeChange('12months');
    fixture.detectChanges();

    expect(analyticsService.selectedRange()).toBe('12months');
    const points = component.chartPoints();
    // 12 months data should have 12 points
    expect(points.revenue.length).toBe(12);
  });
});
