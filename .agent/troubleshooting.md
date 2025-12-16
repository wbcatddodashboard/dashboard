# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### ❌ "npm: command not found"

**Problem:** Node.js/npm not installed

**Solution:**

1. Download Node.js from https://nodejs.org/ (LTS version)
2. Install Node.js
3. Restart terminal
4. Verify: `node --version` and `npm --version`

#### ❌ "npm install" fails with EACCES errors

**Problem:** Permission issues

**Solution (Windows):**

```bash
# Run terminal as Administrator
# Or configure npm to use a different directory
npm config set prefix "%APPDATA%\npm"
```

#### ❌ "npm install" fails with network errors

**Problem:** Firewall or proxy blocking downloads

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If behind corporate proxy:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### Development Server Issues

#### ❌ "Port 3000 is already in use"

**Problem:** Another process using port 3000

**Solution:**

```bash
# Option 1: Next.js will offer port 3001 automatically (accept it)

# Option 2: Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 3: Specify different port
$env:PORT=3001; npm run dev
```

#### ❌ "npm run dev" starts but page shows blank/error

**Problem:** Build or compilation error

**Solution:**

1. Check terminal for error messages
2. Check browser console (F12) for errors
3. Try:
   ```bash
   # Stop server (Ctrl+C)
   # Delete cache and rebuild
   Remove-Item -Recurse -Force .next
   npm run dev
   ```

#### ❌ Changes not reflecting in browser

**Problem:** Cache or hot reload issue

**Solution:**

1. Hard refresh browser: `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Restart dev server
4. Check if file is actually saved
5. Check terminal for compilation errors

### Build Issues

#### ❌ "npm run build" fails with type errors

**Problem:** TypeScript type checking failed

**Solution:**

```bash
# See detailed errors
npm run typecheck

# Common fixes:
# 1. Add null checks
const value = row['Column'] ?? '';

# 2. Add type assertion
const value = row['Column'] as string;

# 3. Fix parameter types to match function signature
```

#### ❌ "Module not found" errors during build

**Problem:** Import path incorrect

**Solution:**

```typescript
// ❌ Wrong
import { MyComponent } from 'components/MyComponent';

// ✅ Correct (use @ alias)
import { MyComponent } from '@/components/MyComponent';
```

#### ❌ Build succeeds but errors at runtime

**Problem:** Client/server code mismatch

**Solution:**

- Add `'use client'` at top of file if using React hooks
- Check if you're using server-only code (fs, path) in client components
- Check if you're using client-only code (window, document) in server components

### Data Issues

#### ❌ Dashboard shows no data or "0" everywhere

**Problem:** CSV files missing or not loading

**Solution:**

1. Verify CSV files exist in `src/data/`
2. Check file names match exactly:
   - `Cat_DDO_Portfolio.csv`
   - `Cat_DDO_Prior_Actions.csv`
   - `Cat_DDO_Triggers.csv`
   - `Cat_DDO_Metadata.csv`
   - `Climate_cobenefits.csv`
3. Check CSV files are not empty
4. Check CSV has headers (first row)
5. Check browser console for API errors

#### ❌ Some data shows, but numbers are wrong

**Problem:** Data parsing issue

**Solution:**

1. Check CSV files don't have unexpected formatting:
   - Commas in numbers should be removed or handled
   - Currency symbols should be removed
   - Empty cells should be empty or "-"
2. Check column names match exactly (case-sensitive)
3. Look at `toNumberLoose` function handling edge cases

#### ❌ Filter shows no results

**Problem:** Values don't match or filter logic issue

**Solution:**

1. Check exact values in CSV (case-sensitive)
2. Check for extra spaces in CSV
3. Try clearing all filters and reapplying
4. Check browser console for errors

### Git/Husky Issues

#### ❌ "husky - pre-commit hook failed"

**Problem:** Linting or formatting errors

**Solution:**

```bash
# See what's failing
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Check type errors
npm run typecheck

# Fix issues manually, then commit again
git add .
git commit -m "Your message"
```

#### ❌ "lint-staged" error during commit

**Problem:** Staged files have linting errors

**Solution:**

```bash
# Fix all linting issues
npm run lint -- --fix

# Re-stage files
git add .

# Commit again
git commit -m "Your message"
```

#### ❌ Want to skip pre-commit hooks (NOT RECOMMENDED)

**Problem:** Need to commit despite hook failures

**Solution:**

```bash
# Skip hooks (only for emergencies!)
git commit --no-verify -m "Your message"

# But you should fix the issues instead!
```

### TypeScript Errors

#### ❌ "Property does not exist on type"

**Problem:** TypeScript doesn't know about property

**Solution:**

```typescript
// ❌ Error
const value = row.Country;

// ✅ Fix: Use bracket notation
const value = row['Country'];

// ✅ Or: Add type assertion
const value = (row as PortfolioRow).Country;
```

#### ❌ "Type 'X' is not assignable to type 'Y'"

**Problem:** Type mismatch

**Solution:**

```typescript
// ❌ Error
const count: number = '5';

// ✅ Fix: Convert type
const count: number = Number('5');

// Or: Change type annotation
const count: string = '5';
```

#### ❌ "Cannot find module '@/...'"

**Problem:** Path alias not recognized

**Solution:**

1. Check `tsconfig.json` has path mapping:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```
2. Restart VS Code or IDE
3. Ensure import starts with `@/`

### React/Component Errors

#### ❌ "Cannot read property of undefined"

**Problem:** Accessing property on null/undefined

**Solution:**

```typescript
// ❌ Error
const name = user.name;

// ✅ Fix: Add optional chaining
const name = user?.name;

// ✅ Or: Provide default
const name = user?.name ?? 'Unknown';

// ✅ Or: Check before accessing
if (user) {
  const name = user.name;
}
```

#### ❌ "Too many re-renders" or infinite loop

**Problem:** useEffect or state update causing loop

**Solution:**

```typescript
// ❌ Error: Missing dependency array
useEffect(() => {
  fetchData(); // Runs on every render!
});

// ✅ Fix: Add empty array for once
useEffect(() => {
  fetchData();
}, []); // Only run once

// ✅ Or: Add dependencies
useEffect(() => {
  fetchData(filters);
}, [filters]); // Run when filters change
```

#### ❌ "Rendered more hooks than during previous render"

**Problem:** Conditional hooks

**Solution:**

```typescript
// ❌ Error: Hook in condition
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ Fix: Always call hooks
const [state, setState] = useState(0);
if (condition) {
  // Use state here
}
```

### API/Network Errors

#### ❌ API returns 404

**Problem:** Endpoint doesn't exist

**Solution:**

1. Check endpoint URL matches file path:
   - `/api/portfolio/list` → `src/app/api/portfolio/list/route.ts`
2. Ensure file is named `route.ts`, not `list.ts`
3. Ensure file exports `GET` or `POST` function

#### ❌ API returns 500

**Problem:** Server error

**Solution:**

1. Check terminal for error stack trace
2. Check CSV files exist and are readable
3. Check data processing logic for errors
4. Add try-catch and log errors:
   ```typescript
   try {
     const data = loadPortfolio();
     return NextResponse.json({ data });
   } catch (err) {
     console.error('Error:', err);
     return NextResponse.json({ error: err.message }, { status: 500 });
   }
   ```

#### ❌ CORS errors

**Problem:** Cross-origin request blocked

**Solution:**

- Shouldn't happen if using relative URLs (`/api/...`)
- If calling external APIs, need to proxy through Next.js API route

### Performance Issues

#### ❌ Page loads slowly

**Problem:** Large data or inefficient rendering

**Solution:**

1. Check browser DevTools → Network tab
2. Check which API calls are slow
3. Optimize data processing functions
4. Add loading states to improve perceived performance
5. Consider pagination for large datasets

#### ❌ Charts render slowly

**Problem:** Too much data or heavy calculations

**Solution:**

1. Limit data points (e.g., top 10 countries)
2. Aggregate data on server, not client
3. Use memoization for expensive calculations:
   ```typescript
   const processedData = useMemo(() => {
     return expensiveCalculation(data);
   }, [data]);
   ```

### Styling Issues

#### ❌ Styles not applying

**Problem:** CSS not loaded or specificity issue

**Solution:**

1. Check Tailwind classes are correct
2. Check CSS file imported in `layout.tsx` or component
3. Try restarting dev server
4. Check browser DevTools → Elements to see computed styles

#### ❌ Layout broken on mobile

**Problem:** Responsive design not working

**Solution:**

1. Use Tailwind responsive prefixes:
   ```typescript
   <div className="w-full md:w-1/2 lg:w-1/3">
   ```
2. Test in browser DevTools → Device mode
3. Check viewport meta tag in `layout.tsx`

### Windows-Specific Issues

#### ❌ Line ending issues (CRLF vs LF)

**Problem:** Git showing all lines changed

**Solution:**

```bash
# Configure git to handle line endings
git config --global core.autocrlf true

# Or disable Prettier's end-of-line formatting
# in .prettierrc:
{
  "endOfLine": "auto"
}
```

#### ❌ Path separator issues

**Problem:** Forward slash vs backslash

**Solution:**

```typescript
// ❌ Don't hardcode paths
const path = 'src\\data\\file.csv';

// ✅ Use path.join
import path from 'node:path';
const csvPath = path.join(process.cwd(), 'src', 'data', 'file.csv');
```

### Environment Issues

#### ❌ Different behavior locally vs production

**Problem:** Environment differences

**Solution:**

1. Check Node.js version matches
2. Check environment variables
3. Test production build locally:
   ```bash
   npm run build
   npm run start
   ```
4. Check Vercel logs for production errors

#### ❌ "Module not found" in production but works locally

**Problem:** Case-sensitive imports

**Solution:**

```typescript
// ❌ Wrong case (works on Windows, fails on Linux/production)
import { MyComponent } from '@/Components/myComponent';

// ✅ Correct case (matches actual file)
import { MyComponent } from '@/components/MyComponent';
```

## Debugging Checklist

When something goes wrong, check these in order:

1. ✅ **Terminal** - Any error messages?
2. ✅ **Browser Console** (F12) - Any JavaScript errors?
3. ✅ **Network Tab** (F12 → Network) - API calls failing?
4. ✅ **React DevTools** - Component state correct?
5. ✅ **Type checking** - `npm run typecheck`
6. ✅ **Linting** - `npm run lint`
7. ✅ **Data files** - CSV files exist and formatted correctly?
8. ✅ **Git status** - Any uncommitted changes causing issues?
9. ✅ **Node modules** - Try deleting and reinstalling

## Quick Fixes

### Nuclear Option (When Everything Fails)

```bash
# Stop dev server (Ctrl+C)

# Delete all caches and dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json

# Reinstall everything
npm install

# Restart dev server
npm run dev
```

### Reset Git State

```bash
# Discard all local changes (WARNING: This deletes your work!)
git reset --hard HEAD

# Or stash changes to save them
git stash
git stash list  # See stashed changes
git stash pop   # Restore stashed changes
```

## Getting Help

### Before Asking for Help

1. Check error message carefully
2. Google the error message
3. Check this troubleshooting guide
4. Check copilot.md for architecture understanding
5. Review recent changes (what did you change before it broke?)

### When Asking for Help, Include:

1. **Error message** (full text, not screenshot if possible)
2. **What you were doing** (steps to reproduce)
3. **What you expected** vs **what happened**
4. **Code snippet** (relevant part)
5. **Environment info**:
   ```bash
   node --version
   npm --version
   git status
   npm run typecheck
   ```

### Useful Debug Commands

```bash
# Check Node/npm versions
node --version
npm --version

# Check Git status
git status
git log --oneline -5

# Type checking
npm run typecheck

# Linting
npm run lint

# See what changed
git diff

# See detailed package info
npm list

# Check Next.js info
npx next info
```

## Prevention Tips

1. **Commit often** - Easier to revert if something breaks
2. **Test before committing** - Run build and typecheck
3. **Use branches** - Don't work directly on main
4. **Read error messages** - They usually tell you what's wrong
5. **Check types** - TypeScript catches many errors early
6. **Keep dependencies updated** - `npm outdated` to check

---

**Remember:** Most errors are not as bad as they seem. Read the error message, Google it, try the solutions above, and you'll likely fix it quickly!
