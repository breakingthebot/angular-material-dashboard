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
