---
description: How to test the dashboard locally
---

# Test Dashboard Locally

Follow these steps to run the World Bank Cat DDO Dashboard on your local machine:

## 1. Verify Prerequisites

Check that Node.js and npm are installed:

```bash
node --version
npm --version
```

You should have Node.js v20 or higher. If not installed, download from: https://nodejs.org/

## 2. Install Dependencies

// turbo
Navigate to the project directory and install all required packages:

```bash
npm install
```

This is like `pip install -r requirements.txt` in Python - it reads `package.json` and installs all dependencies.

## 3. Start Development Server

// turbo
Run the development server with hot reload enabled:

```bash
npm run dev
```

This command:

- Compiles TypeScript → JavaScript
- Starts Next.js server on http://localhost:3000
- Enables hot module replacement (changes auto-refresh)
- Uses Turbopack for faster builds

## 4. Open Browser

Once you see "Ready" in the terminal (usually takes 5-10 seconds), open your browser to:

```
http://localhost:3000
```

## 5. Verify Dashboard Works

You should see:

- Welcome modal (on first visit)
- Sidebar with filters (Status, Region, Country, DRM Pillars)
- Three tabs: Portfolio, Policy Program, Disbursement Triggers
- Charts and data tables

## 6. Test Filters

Try using the filters in the sidebar:

- Select a region (e.g., "East Asia and Pacific")
- Select a status (e.g., "Active")
- Verify that charts and tables update

## 7. Check Console for Errors

Open browser developer tools (F12) and check the Console tab for any errors.

## Common Issues & Solutions

### Port Already in Use

If port 3000 is taken, Next.js will prompt you to use port 3001 automatically.

### Module Not Found

Run `npm install` again to ensure all dependencies are installed.

### Type Errors

Run `npm run typecheck` to see TypeScript errors.

### CSV Data Not Loading

Verify CSV files exist in `src/data/` directory.

## Making Changes While Running

The dev server supports **hot reload**:

- Edit any `.tsx`, `.ts`, or `.css` file
- Save the file
- Browser auto-refreshes with changes
- No need to restart the server

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Other Useful Commands

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint -- --fix

# Run type checking
npm run typecheck

# Run tests
npm run test

# Build for production (to verify no build errors)
npm run build
```

## Next Steps

After verifying the dashboard works locally:

1. Make your changes to code or data
2. Test changes in the browser
3. Run `npm run build` to verify production build works
4. Commit and push to GitHub to deploy to Vercel
