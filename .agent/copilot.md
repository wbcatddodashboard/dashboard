# World Bank Cat DDO Dashboard - Project Guide

## 📋 Project Overview

**Project Name:** World Bank Cat DDO (Catastrophe Deferred Drawdown Option) Dashboard  
**Type:** Next.js 15 web application with TypeScript  
**Deployment:** Vercel (https://dashboard-rho-liard-46.vercel.app/)  
**GitHub Account:** wbcatddodashboard  
**Purpose:** Interactive dashboard to visualize and analyze World Bank catastrophe financial instruments (Cat DDO) portfolio data

## 🎯 What This Dashboard Does

The Cat DDO Dashboard is a data visualization tool that displays information about World Bank Development Policy Financing (DPF) operations with Catastrophe Deferred Drawdown Options. These are financial instruments that allow countries to quickly access emergency funds when disasters strike.

The dashboard provides:

- **Portfolio Overview**: List and statistics of all Cat DDO projects
- **Policy Program Analysis**: Prior actions and result indicators by DRM (Disaster Risk Management) pillars
- **Disbursement Triggers**: Information about what events trigger fund disbursement
- **Climate Co-benefits**: Climate finance tracking
- **Regional & Country Analytics**: Breakdown by geographical regions and individual countries

## 🏗️ Technology Stack (for Python developers)

### Framework: Next.js 15 (Think of it as...)

- **Next.js** = Flask/Django but for React (JavaScript framework)
- **React** = Component-based UI library (like Jinja templates but way more powerful)
- **TypeScript** = JavaScript with type annotations (like Python type hints but enforced)
- **TailwindCSS** = Utility-first CSS framework (styling)

### Key Differences from Python Web Apps:

1. **Client-Server Split**: Next.js runs code on both server (like your Python backend) and client (browser)
2. **API Routes**: Instead of Flask routes, Next.js uses file-based routing in `src/app/api/`
3. **Components**: Instead of templates, you build reusable UI components
4. **Hooks**: React's way of managing state and side effects (like context managers in Python)

## 📁 Project Structure

```
catddodashboard_forkDec2025/
├── src/
│   ├── app/                        # Next.js app router (pages & API routes)
│   │   ├── page.tsx               # Main homepage
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── globals.css            # Global styles
│   │   └── api/                   # API endpoints (like Flask routes)
│   │       ├── portfolio/         # Portfolio-related endpoints
│   │       ├── climate/           # Climate data endpoints
│   │       ├── filters/           # Filter options endpoints
│   │       └── metadata/          # Metadata endpoints
│   │
│   ├── components/                 # React UI components
│   │   ├── CatDDO/                # Main dashboard components
│   │   ├── Dashboard/             # Dashboard hero section
│   │   ├── Sidebar/               # Sidebar with filters
│   │   ├── Welcome/               # Welcome screen
│   │   └── WelcomeModal/          # Welcome modal dialog
│   │
│   ├── contexts/                   # React contexts (global state management)
│   │   ├── FilterContext.tsx      # Manages filter state
│   │   └── TabContext.tsx         # Manages active tab state
│   │
│   ├── lib/                        # Core business logic (like your Python modules)
│   │   ├── csv.ts                 # CSV reading utilities
│   │   ├── portfolio.ts           # Portfolio data processing (MAIN LOGIC HERE)
│   │   ├── climate.ts             # Climate data processing
│   │   └── api-utils.ts           # API helper functions
│   │
│   ├── data/                       # CSV data files (YOUR DATA SOURCE)
│   │   ├── Cat_DDO_Portfolio.csv
│   │   ├── Cat_DDO_Prior_Actions.csv
│   │   ├── Cat_DDO_Triggers.csv
│   │   ├── Cat_DDO_Metadata.csv
│   │   └── Climate_cobenefits.csv
│   │
│   ├── hooks/                      # Custom React hooks (reusable logic)
│   ├── utils/                      # Utility functions
│   └── constants/                  # Constants and configuration
│
├── public/                         # Static assets (images, etc.)
├── package.json                    # Dependencies (like requirements.txt)
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
└── .husky/                         # Git hooks (pre-commit checks)
```

## 🔄 How Data Flows (For Python Developers)

### 1. **Data Source** (CSV Files in `src/data/`)

Think of these as your database tables:

- `Cat_DDO_Portfolio.csv` - Main project list (primary table)
- `Cat_DDO_Prior_Actions.csv` - Actions taken per project
- `Cat_DDO_Triggers.csv` - Trigger conditions
- `Cat_DDO_Metadata.csv` - Configuration (last FY, update date)
- `Climate_cobenefits.csv` - Climate finance data

### 2. **Data Loading** (`src/lib/csv.ts`)

```typescript
// Similar to pandas.read_csv()
export function readCsvAsObjects(csvAbsolutePath: string): CsvRecord[];
```

- Reads CSV files from disk (server-side only)
- Converts to array of objects (like list of dicts in Python)

### 3. **Data Processing** (`src/lib/portfolio.ts`)

This is like your Python data processing module:

```typescript
// Load and filter data (like pandas filtering)
export function loadPortfolioFiltered(filters: FilterState): PortfolioRow[];

// Aggregate functions (like pandas groupby)
export function sumDisbursementsByRegion(portfolioRows: PortfolioRow[]);
export function sumDisbursementsByCountry(portfolioRows: PortfolioRow[]);

// Pivot tables (like pandas pivot_table)
export function crosstabFiscalYearRegion(portfolioRows: PortfolioRow[]);
export function crosstabRegionStatus(portfolioRows: PortfolioRow[]);

// Summary statistics
export function buildTextSummary(
  portfolioRows: PortfolioRow[],
  metadata: Metadata
);
export function buildSummaryTable(portfolioRows: PortfolioRow[]);
```

### 4. **API Endpoints** (`src/app/api/`)

Like Flask routes, but files create routes automatically:

```
src/app/api/portfolio/list/route.ts          → GET /api/portfolio/list
src/app/api/portfolio/text-summary/route.ts  → GET /api/portfolio/text-summary
src/app/api/climate/chart/route.ts           → GET /api/climate/chart
```

Each `route.ts` exports a `GET` or `POST` function:

```typescript
export async function GET(request: Request) {
  // This is like a Flask route handler
  const filters = parseFiltersFromRequest(request);
  const data = loadPortfolioFiltered(filters);
  return NextResponse.json({ data });
}
```

### 5. **Frontend Components** (`src/components/`)

React components fetch data and render UI:

```typescript
// This is like a Jinja template but with logic
function PortfolioContent() {
  const [data, setData] = useState(null);

  // Fetch data (like AJAX call)
  useEffect(() => {
    fetch('/api/portfolio/list')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return <div>{/* Render data */}</div>;
}
```

### 6. **State Management** (`src/contexts/`)

Global state (like session variables):

- `FilterContext` - Stores selected filters (status, region, country, pillars)
- `TabContext` - Stores active tab

## 🔑 Key Components & Their Purpose

### Main Dashboard Components:

1. **Welcome.tsx** - Main entry point, combines hero + tabs
2. **CatDDOTabs.tsx** - Tab navigation with 3 tabs:
   - Portfolio (project list + charts)
   - Policy Program (prior actions by DRM pillar)
   - Disbursement Triggers (trigger conditions)

3. **Sidebar.tsx** - Filter panel (status, region, country, DRM pillars)

### Data Processing Functions (in `lib/portfolio.ts`):

| Function                     | Purpose               | Python Equivalent                     |
| ---------------------------- | --------------------- | ------------------------------------- |
| `loadPortfolio()`            | Load portfolio CSV    | `pd.read_csv()`                       |
| `loadPortfolioFiltered()`    | Filter by criteria    | `df[df['Status'].isin(filters)]`      |
| `sumDisbursementsByRegion()` | Group by region       | `df.groupby('Region').sum()`          |
| `crosstabFiscalYearRegion()` | Pivot table           | `pd.crosstab()` or `pd.pivot_table()` |
| `buildTextSummary()`         | Generate text + stats | Custom aggregations                   |
| `toNumberLoose()`            | Parse numbers safely  | `pd.to_numeric(errors='coerce')`      |

## 📊 Data Schema

### Portfolio CSV Structure:

- **P#**: Project code (unique identifier)
- **Country**, **Region**: Geography
- **Status**: Active, Closed, Pipeline, Dropped
- **Fiscal Year**: FY24, FY25, etc.
- **Source**: IBRD, IDA, or "IBRD and IDA"
- **Standalone/Mixed**: Operation type
- **Commitment (Cat DDO only)**: Committed amount
- **Disbursements - Cat DDO Cum.**: Total disbursed
- **CAT DDO Undisbursed**: Remaining funds
- **FY24 Cat DDO Disb.**, **FY25 Cat DDO Disb.**, etc.: Disbursements by year
- **Activation for COVID**: Yes/No

### Prior Actions CSV:

- **P#**: Links to portfolio
- **DRM Pillar**: Risk ID & Assessment, Risk Reduction, Preparedness, etc.
- **Prior Action**: Description of action
- **Result Indicator**: Measurable outcome

### Triggers CSV:

- **P#**: Links to portfolio
- **Trigger Type**: Hazard type
- **Trigger Description**: Details

## 🚀 Getting Started Locally

### Prerequisites:

```bash
# Check if Node.js is installed (like checking Python version)
node --version  # Should be v20 or higher

# Check npm (like pip)
npm --version
```

### Installation:

```bash
# Navigate to project
cd c:\Users\jqnmu\OneDrive\World_Bank_DRM\catddodashboard_forkDec2025

# Install dependencies (like pip install -r requirements.txt)
npm install

# Run development server (like python app.py or flask run)
npm run dev

# Open browser to http://localhost:3000
```

### Available Scripts:

```bash
npm run dev        # Start development server (hot reload enabled)
npm run build      # Build for production (like compiling)
npm run start      # Run production build
npm run lint       # Check code style (like flake8)
npm run typecheck  # Check TypeScript types (like mypy)
npm run test       # Run tests (like pytest)
```

## 🔧 Making Changes

### To Update Data:

1. Replace CSV files in `src/data/`
2. Ensure column names match existing structure
3. Update `Cat_DDO_Metadata.csv` if new fiscal year
4. Commit and push to GitHub (auto-deploys to Vercel)

### To Modify Dashboard Logic:

1. **Business logic**: Edit `src/lib/portfolio.ts` or `src/lib/climate.ts`
2. **API endpoints**: Edit files in `src/app/api/`
3. **UI components**: Edit files in `src/components/`
4. **Filters/state**: Edit `src/contexts/FilterContext.tsx`

### To Add a New Chart/Visualization:

1. Add data processing function in `src/lib/portfolio.ts`
2. Create API endpoint in `src/app/api/portfolio/[your-endpoint]/route.ts`
3. Create component in `src/components/CatDDO/components/`
4. Use the component in relevant tab content

## 📝 Important Files to Know

### For Data Updates:

- `src/data/` - All CSV files
- `src/lib/csv.ts` - CSV reading logic
- `src/lib/portfolio.ts` - Main data processing (577 lines!)

### For UI Changes:

- `src/components/CatDDO/CatDDOTabs.tsx` - Main tab structure
- `src/components/CatDDO/PortfolioContent.tsx` - Portfolio tab
- `src/components/CatDDO/PolicyProgramContent.tsx` - Policy tab
- `src/components/CatDDO/DisbursementTriggersContent.tsx` - Triggers tab

### For Configuration:

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript settings
- `next.config.ts` - Next.js configuration
- `.prettierrc` - Code formatting rules
- `eslint.config.mjs` - Linting rules

## 🐛 Debugging Tips (For Python Developers)

### Check Console Logs:

```typescript
// In TypeScript (like print() in Python)
console.log('Debug:', variable);

// In browser: Press F12 → Console tab
```

### Type Errors:

```bash
# Check for type errors (like mypy)
npm run typecheck
```

### API Testing:

```bash
# Open in browser or use curl
http://localhost:3000/api/portfolio/list
http://localhost:3000/api/portfolio/text-summary
```

### Common Issues:

1. **"Module not found"** → Run `npm install`
2. **"Type error"** → Check TypeScript types
3. **"Cannot read property of undefined"** → Add null checks: `row['Country'] ?? ''`
4. **Data not updating** → Check if you're reading correct CSV path

## 🔄 Git Workflow for Contributing

### Setup:

```bash
# Clone repo (already done)
git clone [repo-url]

# Create a branch for your changes
git checkout -b feature/my-feature-name
```

### Make Changes:

```bash
# Check status
git status

# Stage files
git add src/data/Cat_DDO_Portfolio.csv
git add src/lib/portfolio.ts

# Commit (Husky will run pre-commit hooks)
git commit -m "Update portfolio data for December 2025"
```

### Push and Create PR:

```bash
# Push to GitHub
git push origin feature/my-feature-name

# Go to GitHub and create Pull Request
```

### Pre-commit Hooks (Husky):

Before each commit, the following run automatically:

1. ESLint (code linting)
2. Prettier (code formatting)
3. Type checking

## 📚 TypeScript/JavaScript Crash Course for Python Developers

### Variables:

```typescript
// Python: x = 5
const x = 5; // Constant (can't reassign)
let y = 10; // Variable (can reassign)

// Python: name: str = "John"
const name: string = 'John';
```

### Functions:

```typescript
// Python: def add(a: int, b: int) -> int:
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (like lambda but more powerful)
const add = (a: number, b: number): number => a + b;
```

### Arrays (Lists):

```typescript
// Python: nums = [1, 2, 3]
const nums = [1, 2, 3];

// Python: [x * 2 for x in nums]
const doubled = nums.map((x) => x * 2);

// Python: [x for x in nums if x > 1]
const filtered = nums.filter((x) => x > 1);

// Python: sum(nums)
const total = nums.reduce((sum, x) => sum + x, 0);
```

### Objects (Dictionaries):

```typescript
// Python: person = {"name": "John", "age": 30}
const person = { name: 'John', age: 30 };

// Access
person.name; // "John"
person['name']; // "John"

// Python: person.get("name", "Unknown")
const name = person.name ?? 'Unknown';
```

### Async/Await:

```typescript
// Python:
// import requests
// response = requests.get(url)
// data = response.json()

// JavaScript:
const response = await fetch(url);
const data = await response.json();
```

### Imports:

```typescript
// Python: from lib.csv import readCsvAsObjects
import { readCsvAsObjects } from '@/lib/csv';

// Python: import pandas as pd
import * as fs from 'node:fs';
```

## 🎨 Styling (Tailwind CSS)

This project uses Tailwind CSS - utility classes for styling:

```typescript
// Instead of writing CSS, use classes:
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>

// Equivalent CSS:
// background-color: blue;
// color: white;
// padding: 1rem;
// border-radius: 0.5rem;
```

## 🧪 Testing

```bash
# Run tests (like pytest)
npm run test

# Run tests in watch mode
npm run test:watch
```

Test files are in `__tests__/` or next to components as `*.test.tsx`

## 📦 Deployment

### Automatic Deployment (Current Setup):

- Push to `main` branch → Auto-deploys to Vercel
- Preview deployments for PRs

### Manual Deployment:

```bash
# Build locally to test
npm run build

# Test production build
npm run start
```

## 🔐 Environment Variables

If you need to add secrets (API keys, etc.):

1. Create `.env.local` (not committed to Git)
2. Add variables: `NEXT_PUBLIC_API_KEY=xyz`
3. Access in code: `process.env.NEXT_PUBLIC_API_KEY`

## 📞 Quick Reference Commands

```bash
# Start dev server
npm run dev

# Install dependencies
npm install

# Format code
npm run lint -- --fix

# Check types
npm run typecheck

# Build for production
npm run build

# Git workflow
git status
git add .
git commit -m "Your message"
git push origin your-branch-name
```

## 🎓 Learning Resources

### For Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)

### For React:

- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### For TypeScript:

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript for Python Developers](https://levelup.gitconnected.com/typescript-for-python-developers-647b5c5bca61)

## 💡 Pro Tips

1. **Hot Reload**: Code changes auto-refresh the browser in dev mode
2. **React DevTools**: Install Chrome extension to debug React components
3. **TypeScript IntelliSense**: Use VS Code for great autocomplete
4. **CSV Changes**: Any CSV update auto-reflects on next page refresh (no caching)
5. **Console is Your Friend**: Check browser console (F12) for errors
6. **Read the Types**: Hover over variables in VS Code to see their types

## 🚨 Common Gotchas

1. **Async Data Loading**: Components render before data loads (use loading states)
2. **Null/Undefined**: Check with `?? ''` or `?.` (optional chaining)
3. **Array Mutations**: Use `.map()`, `.filter()` instead of direct mutation
4. **CSV Column Names**: Must match exactly (case-sensitive)
5. **Git Hooks**: Pre-commit hooks might fail - fix linting errors before committing

## 📧 Need Help?

- Check browser console for errors (F12)
- Read error messages carefully (TypeScript errors are helpful!)
- Google: "Next.js [your question]" or "React hooks [your question]"
- Compare to Python concepts above

---

**Version:** December 2025  
**Last Updated:** This guide was created for the forked repository  
**Maintained by:** jqnmunozdiaz

Good luck! Remember: Next.js is just React + SSR, React is just components, TypeScript is just JavaScript with types, and it's all just functions and data - concepts you already know from Python! 🐍 → 🟦
