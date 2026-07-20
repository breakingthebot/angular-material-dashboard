/*
 * components/layout/sidenav-layout.component.ts
 * Manages responsive layout state, theme toggles, and navigation hooks.
 * Connects to: app.routes.ts, styles.css
 * Created: 2026-07-20
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  templateUrl: './sidenav-layout.component.html',
  styleUrl: './sidenav-layout.component.css'
})
export class SidenavLayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  // Observable mapped to Signal for state binding
  isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

  // Layout expansion state
  isExpanded = signal<boolean>(true);
  
  // Theme state
  isDarkTheme = signal<boolean>(false);

  // Navigation configurations
  navLinks: NavLink[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/transactions', label: 'Transactions', icon: 'receipt_long' },
    { path: '/analytics', label: 'Analytics', icon: 'bar_chart' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];

  ngOnInit(): void {
    // Check local storage or match media for user preference
    const storedTheme = localStorage.getItem('theme-pref');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      this.setTheme(true);
    }
  }

  toggleSidenav(): void {
    this.isExpanded.update(val => !val);
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkTheme());
  }

  private setTheme(dark: boolean): void {
    this.isDarkTheme.set(dark);
    const bodyClassList = document.body.classList;
    if (dark) {
      bodyClassList.add('dark-theme');
      localStorage.setItem('theme-pref', 'dark');
    } else {
      bodyClassList.remove('dark-theme');
      localStorage.setItem('theme-pref', 'light');
    }
  }
}
