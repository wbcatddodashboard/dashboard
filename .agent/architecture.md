# Project Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USER'S BROWSER                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │         React Components (Frontend)                │   │
│  │  - Sidebar (Filters)                               │   │
│  │  - CatDDOTabs (3 tabs)                             │   │
│  │  - Charts & Tables                                 │   │
│  │                                                     │   │
│  │  Uses React Hooks:                                 │   │
│  │  - useState (local state)                          │   │
│  │  - useContext (global filters)                     │   │
│  │  - useEffect (data fetching)                       │   │
│  └────────────────┬───────────────────────────────────┘   │
│                   │ HTTP Requests                          │
│                   │ (fetch API)                            │
└───────────────────┼────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS SERVER (Vercel/Local)                  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐   │
│  │           API Routes (Backend)                     │   │
│  │  /api/portfolio/list                               │   │
│  │  /api/portfolio/text-summary                       │   │
│  │  /api/portfolio/disbursements-by-region            │   │
│  │  /api/climate/chart                                │   │
│  │  ... (12 total endpoints)                          │   │
│  └────────────────┬───────────────────────────────────┘   │
│                   │                                         │
│                   ▼                                         │
│  ┌────────────────────────────────────────────────────┐   │
│  │      Business Logic (lib/)                         │   │
│  │  - portfolio.ts (577 lines - CORE LOGIC)           │   │
│  │  - climate.ts                                      │   │
│  │  - csv.ts                                          │   │
│  │                                                     │   │
│  │  Functions:                                        │   │
│  │  - loadPortfolio()                                 │   │
│  │  - loadPortfolioFiltered()                         │   │
│  │  - sumDisbursementsByRegion()                      │   │
│  │  - crosstabFiscalYearRegion()                      │   │
│  │  - buildTextSummary()                              │   │
│  └────────────────┬───────────────────────────────────┘   │
│                   │                                         │
│                   ▼                                         │
│  ┌────────────────────────────────────────────────────┐   │
│  │           CSV Files (src/data/)                    │   │
│  │  - Cat_DDO_Portfolio.csv (main data)               │   │
│  │  - Cat_DDO_Prior_Actions.csv                       │   │
│  │  - Cat_DDO_Triggers.csv                            │   │
│  │  - Cat_DDO_Metadata.csv (config)                   │   │
│  │  - Climate_cobenefits.csv                          │   │
│  └────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Loading Portfolio Data

1. **User opens dashboard** → Browser loads React components
2. **Component mounts** → `useEffect` hook triggers
3. **Fetch request** → `fetch('/api/portfolio/list?status=Active&region=EAP')`
4. **API route executes** → `src/app/api/portfolio/list/route.ts`
5. **Parse filters** → Extract query parameters
6. **Load data** → Call `loadPortfolioFiltered(filters)` from `lib/portfolio.ts`
7. **Read CSV** → `readCsvAsObjects('Cat_DDO_Portfolio.csv')`
8. **Filter rows** → Apply status, region, country filters
9. **Transform data** → Map to ListRow format
10. **Return JSON** → `NextResponse.json({ data: list })`
11. **Update state** → React component receives data, calls `setState(data)`
12. **Re-render** → Component displays updated data in table/chart

## Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├── FilterProvider (contexts/FilterContext.tsx)
│   └── TabProvider (contexts/TabContext.tsx)
│       ├── LayoutContainer
│       │   ├── Sidebar
│       │   │   ├── StatusFilter
│       │   │   ├── RegionFilter
│       │   │   ├── CountryFilter
│       │   │   └── DRMPillarFilter
│       │   │
│       │   └── MainContent
│       │       └── Welcome (page.tsx)
│       │           ├── DashboardHero
│       │           │   ├── GlobalCatDDO (overview stats)
│       │           │   └── OverViewCatDDO (text summary)
│       │           │
│       │           └── CatDDOTabs
│       │               ├── Tab 1: PortfolioContent
│       │               │   ├── ProjectListTable
│       │               │   ├── SummaryTable
│       │               │   ├── DisbursementsByRegionChart
│       │               │   ├── DisbursementsByCountryChart
│       │               │   ├── DisbursementsByFYChart
│       │               │   └── ApprovalsByRegionChart
│       │               │
│       │               ├── Tab 2: PolicyProgramContent
│       │               │   ├── DRMPillarFilter
│       │               │   └── PriorActionsResultIndicators
│       │               │
│       │               └── Tab 3: DisbursementTriggersContent
│       │                   └── TriggersTable
│       │
│       └── WelcomeModalProvider
│           └── WelcomeModal (shown on first visit)
```

## State Management

### Global State (Context API)

#### FilterContext

```typescript
{
  statuses: string[];      // e.g., ["Active", "Closed"]
  regions: string[];       // e.g., ["East Asia and Pacific"]
  countries: string[];     // e.g., ["Philippines", "Vietnam"]
  pillars: string[];       // e.g., ["Risk Identification & Assessment"]
}
```

Used by:

- Sidebar filters (update filters)
- All API calls (query parameters)
- Charts and tables (filtered data)

#### TabContext

```typescript
{
  activeTab: string; // "portfolio" | "policy" | "triggers"
}
```

Used by:

- CatDDOTabs (tab navigation)
- Each tab content component

### Local State (useState)

Each component manages its own:

- `loading` - Loading state while fetching data
- `data` - Fetched data from API
- `error` - Error messages
- UI-specific state (e.g., expanded rows, selected items)

## API Endpoints Map

| Endpoint                                    | Source               | Purpose               | Returns                                       |
| ------------------------------------------- | -------------------- | --------------------- | --------------------------------------------- |
| `/api/portfolio/list`                       | Portfolio CSV        | Project list          | Array of projects                             |
| `/api/portfolio/text-summary`               | Portfolio + Metadata | Text summary          | Summary phrases + numbers                     |
| `/api/portfolio/summary-table`              | Portfolio CSV        | Summary table         | IBRD/IDA disbursed/undisbursed/pipeline       |
| `/api/portfolio/disbursements-by-region`    | Portfolio CSV        | Region breakdown      | Array of {region, commitment, disbursements}  |
| `/api/portfolio/disbursements-by-country`   | Portfolio CSV        | Country breakdown     | Array of {country, commitment, disbursements} |
| `/api/portfolio/disbursements-by-fy-source` | Portfolio CSV        | Fiscal year trends    | {ibrd: [], ida: [], ibrdAndIda: []} by FY     |
| `/api/portfolio/approvals-by-fy-region`     | Portfolio CSV        | Approvals over time   | Pivot table: FY × Region                      |
| `/api/portfolio/region-by-status`           | Portfolio CSV        | Status by region      | Pivot table: Region × Status                  |
| `/api/portfolio/by-fy-operation-type`       | Portfolio CSV        | Operation types       | Pivot table: FY × Standalone/Mixed            |
| `/api/portfolio/global-chart`               | Portfolio CSV        | Global metrics        | Overall statistics                            |
| `/api/portfolio/prior-actions`              | Prior Actions CSV    | Policy actions        | List of prior actions by pillar               |
| `/api/portfolio/triggers`                   | Triggers CSV         | Disbursement triggers | List of trigger conditions                    |
| `/api/climate/chart`                        | Climate CSV          | Climate co-benefits   | Climate finance data                          |
| `/api/filters/options`                      | All CSVs             | Filter options        | Unique values for filters                     |
| `/api/metadata`                             | Metadata CSV         | Metadata              | Update date, last FY                          |

## File Organization Logic

### Components (`src/components/`)

Organized by feature:

- `CatDDO/` - Main dashboard (portfolio, policy, triggers tabs)
  - `components/` - Reusable sub-components (charts, tables, widgets)
  - `styled/` - Styled components (CSS-in-JS)
  - `interfaces/` - TypeScript interfaces
  - `constants/` - Constants specific to Cat DDO
- `Dashboard/` - Hero section (global stats, overview)
- `Sidebar/` - Filter panel
- `Welcome/` - Welcome screen
- `WelcomeModal/` - First-visit modal

### Lib (`src/lib/`)

Business logic:

- `csv.ts` - CSV reading utilities (used by all data loaders)
- `portfolio.ts` - Portfolio data processing (main logic)
- `climate.ts` - Climate data processing
- `api-utils.ts` - API helper functions (parse query params, etc.)

### App (`src/app/`)

Next.js App Router:

- `page.tsx` - Homepage (renders Welcome component)
- `layout.tsx` - Root layout (providers, sidebar, etc.)
- `api/` - API routes (file-based routing)

## Key Design Patterns

### 1. Server-Side Data Loading

All CSV reading happens on the server (API routes), not in browser.

**Why?**

- Browser can't access file system
- Reduces bundle size (CSV parsing libraries run on server)
- Keeps data fresh (re-reads CSV on each request)

### 2. Context API for Global State

Filters are shared across components via Context.

**Why?**

- Avoids prop drilling (passing filters through many components)
- Single source of truth
- Automatic re-render when filters change

### 3. Component Composition

Large components broken into smaller, reusable pieces.

**Why?**

- Easier to understand and maintain
- Reusable across different tabs
- Better testing

### 4. Styled Components

Styles defined as components (CSS-in-JS).

**Why?**

- Scoped styles (no global CSS conflicts)
- Dynamic styling based on props
- Co-located with component logic

### 5. TypeScript Interfaces

Strict typing for all data structures.

**Why?**

- Catch errors at compile time
- Better autocomplete
- Self-documenting code

## Data Processing Pipeline

### CSV → Objects → Filtering → Aggregation → JSON → React

1. **CSV File** (`Cat_DDO_Portfolio.csv`)

   ```csv
   P#,Country,Region,Status,Commitment (Cat DDO only),...
   P123456,Philippines,East Asia and Pacific,Active,100000000,...
   ```

2. **Parse to Objects** (`readCsvAsObjects`)

   ```typescript
   [
     { "P#": "P123456", "Country": "Philippines", ... },
     ...
   ]
   ```

3. **Filter** (`loadPortfolioFiltered`)

   ```typescript
   rows.filter(
     (r) =>
       filters.statuses.includes(r.Status) && filters.regions.includes(r.Region)
   );
   ```

4. **Aggregate** (`sumDisbursementsByRegion`)

   ```typescript
   [
     { region: "East Asia and Pacific", disbursements: 1500.5 },
     { region: "Latin America and Caribbean", disbursements: 890.2 },
     ...
   ]
   ```

5. **Return JSON** (API route)

   ```json
   {
     "data": [
       { "region": "East Asia and Pacific", "disbursements": 1500.5 },
       ...
     ]
   }
   ```

6. **Render in React**
   ```typescript
   <BarChart data={data} />
   ```

## Critical Files (In Order of Importance)

1. **`src/lib/portfolio.ts`** (577 lines) - Core business logic
2. **`src/data/Cat_DDO_Portfolio.csv`** - Main data source
3. **`src/components/CatDDO/CatDDOTabs.tsx`** - Tab structure
4. **`src/contexts/FilterContext.tsx`** - Global filter state
5. **`src/app/layout.tsx`** - App structure
6. **`src/app/api/portfolio/*/route.ts`** - API endpoints
7. **`src/components/Sidebar/Sidebar.tsx`** - Filter UI

## Common Modification Scenarios

### Scenario 1: Add New CSV Column

1. Add column to CSV file
2. No code changes needed if just displaying
3. If filtering: Update `FilterContext` and `Sidebar`
4. If aggregating: Update functions in `lib/portfolio.ts`

### Scenario 2: Add New Chart

1. Add data processing function in `lib/portfolio.ts`
2. Create API endpoint in `src/app/api/portfolio/[name]/route.ts`
3. Create chart component in `src/components/CatDDO/components/`
4. Import and use in relevant tab content

### Scenario 3: Modify Existing Calculation

1. Find calculation in `lib/portfolio.ts`
2. Modify function logic
3. Test locally (`npm run dev`)
4. Verify production build (`npm run build`)

### Scenario 4: Add New Filter

1. Add to `FilterState` in `contexts/FilterContext.tsx`
2. Add UI component in `components/Sidebar/`
3. Update API endpoints to accept new filter
4. Update `loadPortfolioFiltered` to apply filter

## Performance Considerations

### Current Approach

- CSV files read on each API request
- Data processed on-demand
- No caching (always fresh data)

### Pros

- Simple implementation
- Always up-to-date
- Easy to understand

### Cons

- Re-reads CSV on every request
- Re-processes data each time

### Future Optimization (if needed)

1. Cache parsed CSV in memory
2. Invalidate cache when CSV changes
3. Use API route segment cache
4. Pre-compute common aggregations

## Testing Strategy

### Unit Tests

- Test data processing functions in `lib/portfolio.ts`
- Test filter logic
- Test calculations

### Integration Tests

- Test API endpoints return correct data
- Test components render with mock data

### E2E Tests (Future)

- Test full user flows
- Test filter interactions
- Test data visualization

## Deployment Flow

```
Local Development
  ↓ (git commit & push)
GitHub Repository
  ↓ (automatic trigger)
Vercel Build Process
  ↓ (npm run build)
Production Deployment
  ↓
Live Site (https://dashboard-rho-liard-46.vercel.app/)
```

Every push to `main` branch triggers automatic deployment.

## Security Considerations

- No user authentication (public dashboard)
- No sensitive data (all CSV data is for public disclosure)
- No database (CSV files only)
- No API keys needed
- Read-only operations (no data mutation)

## Browser Support

Targets modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Uses modern features:

- ES2017
- CSS Grid/Flexbox
- Fetch API
- Async/await

---

**Summary**: This is a server-rendered React application that reads CSV files, processes them server-side, exposes the data via API endpoints, and renders interactive charts and tables on the client. The architecture is simple and maintainable, with clear separation between data processing (lib/), API (app/api/), and UI (components/).
