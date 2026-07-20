/*
 * components/layout/sidenav-layout.component.spec.ts
 * Tests responsive layout updates, expansion flags, and theme toggle parameters.
 * Created: 2026-07-20
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidenavLayoutComponent } from './sidenav-layout.component';
import { routes } from '../../app.routes';

describe('SidenavLayoutComponent', () => {
  let component: SidenavLayoutComponent;
  let fixture: ComponentFixture<SidenavLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLayoutComponent],
      providers: [
        provideRouter(routes),
        provideAnimationsAsync()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clear theme modifications on document body
    document.body.classList.remove('dark-theme');
    localStorage.clear();
  });

  it('should create layout component', () => {
    expect(component).toBeTruthy();
  });

  it('should support collapsing sidenav', () => {
    expect(component.isExpanded()).toBe(true);
    component.toggleSidenav();
    expect(component.isExpanded()).toBe(false);
  });

  it('should support toggling dark theme class on document body', () => {
    expect(component.isDarkTheme()).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);

    component.toggleTheme();
    fixture.detectChanges();

    expect(component.isDarkTheme()).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    expect(localStorage.getItem('theme-pref')).toBe('dark');

    component.toggleTheme();
    fixture.detectChanges();

    expect(component.isDarkTheme()).toBe(false);
    expect(document.body.classList.contains('dark-theme')).toBe(false);
    expect(localStorage.getItem('theme-pref')).toBe('light');
  });

  it('should restore theme preference from localStorage on initialization', () => {
    localStorage.setItem('theme-pref', 'dark');
    
    const freshFixture = TestBed.createComponent(SidenavLayoutComponent);
    const freshComponent = freshFixture.componentInstance;
    freshFixture.detectChanges();

    expect(freshComponent.isDarkTheme()).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });
});
