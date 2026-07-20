# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-20

### Added
- Initialized Angular 19 workspace with TypeScript strict types.
- Configured Angular Material components library and defaults.
- Bootstrapped local AGENTS.md build guidelines and conventions.
- Added custom file exclusion overrides to Git ignore files.

## [0.2.0] - 2026-07-20

### Added
- Implemented responsive layout Sidenav navigation shell using `@angular/material/sidenav` and layout breakpoints observers.
- Designed collapsing toggle transitions changing the sidebar to a sleek icon-only mini mode.
- Programmed body class toggles supporting Light/Dark visual modes with persistent local storage caching preferences.
- Added standalone page components (`Dashboard`, `Transactions`, `Analytics`, `Settings`) and configured route bindings.
- Created unit tests verifying theme state switches and drawer toggle transitions.

## [0.3.0] - 2026-07-20

### Added
- Created `DashboardService` with signal states managing metric datasets and loading flags.
- Developed an interactive KPI stats card grid with hover animations, Google Icon support, and responsive grid layouts.
- Built animated skeleton placeholder cards with keyframe shimmers representing loading latency cycles.
- Added live synchronization action button with visual spinning animations when executing queries.
- Added unit specs asserting skeleton shimmers fade out and correct metric values resolve on delayed fetches.

## [0.4.0] - 2026-07-20

### Added
- Implemented `TransactionService` handling transactional invoice records and mock gateway latency.
- Coded interactive, paginated `TransactionsComponent` utilizing Angular Material's sorting, pagination, and tables.
- Programmed a custom lookup predicate filter supporting search matchings on Customer Names, IDs, and Status keys.
- Designed a split responsive drawer card panel slide-animating invoice details when clicking rows.
- Wrote unit specs verifying table counts, text queries filtration, selection signals, and close buttons triggers.

## [0.5.0] - 2026-07-20

### Added
- Built `AnalyticsService` storing timeline datasets mapping Gross Revenue and Operating Expenses points.
- Coded custom, responsive SVG line plotting logic inside standalone component `AnalyticsComponent`.
- Integrated legend visibility toggle checkboxes dynamically rendering polyline path indicators.
- Designed inline SVG overlay tooltip rects displaying coordinate info on nodes hovers.
- Wrote unit specs verifying grid dimensions calculation, stream checks, hover triggers, and timeline ranges selectors.

## [0.6.0] - 2026-07-20

### Added
- Created `SettingsService` managing settings state configurations and available roles autocomplete collections.
- Programmed Reactive Form settings group in `SettingsComponent` containing name, email, chips lists, and slide toggle inputs.
- Coded custom autocomplete role chips inputs with chip removal and chip additions triggers.
- Handled MatSnackBar notifications reporting successful updates after simulated saving delay timeouts.
- Wrote unit specs verifying form validation indicators, custom autocomplete filter calculations, chips changes, and submissions saving notifications.

## [0.7.0] - 2026-07-20

### Added
- Created `AuditService` containing administrative log entries, status severities, and IP telemetry values.
- Built interactive `AuditComponent` layout rendering connected timeline badge indicators and slide-out details review drawers.
- Added drop-down filters dynamically pruning items based on selected category types and status levels.
- Wired text lookups matching query parameters to user, action details, and log ID keys.
- Wrote unit specs verifying timeline filters, category selects, and drawer activation triggers.

## [0.8.0] - 2026-07-20

### Added
- Integrated Router state bindings inside `AuditComponent` reactive flow syncing query parameters dynamically.
- Programmed deep-linking synchronization inside `TransactionsComponent` supporting persistent table filters and drawer selections.
- Optimized live search query keystroke parameters with back history replacement flags.
- Wrote unit specs providing router mock configurations and assertion checks for deep-linking components.

## [0.9.0] - 2026-07-20

### Added
- Created functional authentication router guard `roleGuard` validating active settings credentials.
- Attached `roleGuard` authorization rules directly onto `/audit` logs timeline route definitions.
- Coded dedicated `ForbiddenComponent` (403 card template) reporting access denied statuses and displaying active vs required privileges.
- Wrote unit specs verifying component mounting, local settings permission calculations, and guard redirect/pass conditions.
