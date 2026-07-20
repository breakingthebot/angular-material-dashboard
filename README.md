# Angular Material Dashboard UI

A premium enterprise administration dashboard interface built using Angular 19 and the Angular Material components library. Demonstrates structured layout design featuring stats cards, data tables, reactive chart systems, and stateful input forms.

## Stack
- **Framework**: Angular 19
- **Components & Layout**: Angular Material (`@angular/material` and `@angular/cdk`)
- **Language**: TypeScript (strict mode enabled)
- **Deployment**: Vercel

## Setup
To set up the project locally:
1. Clone the repository tree:
   ```bash
   git clone https://github.com/breakingthebot/angular-material-dashboard.git
   ```
2. Navigate into the project folder:
   ```bash
   cd angular-material-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Refer to `.env.example`. No keys or tokens are stored or committed.
- `API_URL`: Root endpoint for querying mock dashboard dataset metrics.
- `PORT`: Override port configuration (defaults to `4200`).

## Running Locally
To launch a local hot-reloading development server:
```bash
npm run start
```
Once initialized, open `http://localhost:4200` in your web browser.

To execute the unit spec test suite:
```bash
npm run test -- --watch=false
```

To run a production-ready application build compilation:
```bash
npm run build
```

## Deployed
The live application is hosted at:
[https://angular-material-dashboard-blue.vercel.app](https://angular-material-dashboard-blue.vercel.app)

## Architecture Notes
- **Modular Core**: Follows modular architecture separating dashboard pages, layout wrappers, widget components, and telemetry services.
- **Angular Material Foundations**: Inherits standard Indigo-Pink Material UI guidelines using robust CDK layers for dialogs, tables, and overlays.
- **Strict Typing Rules**: Enforces strict TypeScript parameter validations across all components.

## Data Handling
- **Data Posture**: This is a client-only dashboard. It stores nothing on third-party servers. All settings and parameters are processed in-memory.
- **Permissions**: Requires no special system permission scopes or OAuth credentials.

## Notes
- Built using Angular 19 standalone component paradigms without legacy NgModules.
- Designed with responsive grid flex systems scaling cleanly from phone viewport dimensions to widescreen monitors.
