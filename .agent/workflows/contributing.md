---
description: How to make changes and propose them to the original GitHub project
---

# Contributing Changes

This guide explains how to make changes to the dashboard and propose them to the original GitHub project via Pull Request.

## Understanding the Git Workflow

Since you forked the repository, here's the workflow:

1. **Your Fork** (on GitHub under your account)
   ↓
2. **Your Local Clone** (on your machine)
   ↓
3. **Make Changes** (edit code/data)
   ↓
4. **Push to Your Fork**
   ↓
5. **Create Pull Request** → **Original Repository**

## Step-by-Step Guide

### 1. Create a Feature Branch

Always create a new branch for your changes (don't work directly on `main`):

```bash
# Check current branch
git branch

# Create and switch to new branch
git checkout -b feature/descriptive-name

# Examples:
# git checkout -b data/update-december-2025
# git checkout -b feature/add-new-chart
# git checkout -b fix/portfolio-filter-bug
```

### 2. Make Your Changes

Edit files as needed:

- **Data updates**: Modify CSV files in `src/data/`
- **Code changes**: Edit TypeScript files in `src/`
- **New features**: Add new components or API endpoints

### 3. Test Your Changes Locally

```bash
# Start dev server
npm run dev

# In browser: http://localhost:3000
# Verify your changes work correctly
```

### 4. Run Quality Checks

Before committing, ensure code quality:

```bash
# Check for type errors
npm run typecheck

# Check linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Run tests (if any exist)
npm run test

# Try production build
npm run build
```

### 5. Stage Your Changes

```bash
# See what files changed
git status

# Stage specific files
git add src/data/Cat_DDO_Portfolio.csv
git add src/lib/portfolio.ts

# Or stage all changes
git add .
```

### 6. Commit Your Changes

```bash
# Commit with descriptive message
git commit -m "Update portfolio data for December 2025"

# More examples:
# git commit -m "Add new disbursement chart by country"
# git commit -m "Fix: Correct region filter logic"
# git commit -m "Feat: Add climate co-benefits tab"
```

**Note**: Husky pre-commit hooks will run automatically:

- Linting
- Code formatting
- Type checking

If they fail, fix the issues and commit again.

### 7. Push to Your Fork

```bash
# Push your branch to GitHub
git push origin feature/descriptive-name

# If first time pushing this branch:
git push --set-upstream origin feature/descriptive-name
```

### 8. Create Pull Request on GitHub

1. Go to your fork on GitHub: `https://github.com/YOUR_USERNAME/catddodashboard_forkDec2025`

2. You should see a banner: "Your branch is ahead of main" with a button "Compare & pull request"

3. Click **"Compare & pull request"**

4. Fill out the PR form:
   - **Title**: Brief description (e.g., "Update Cat DDO portfolio data - December 2025")
   - **Description**: Detailed explanation:

     ```markdown
     ## Changes Made

     - Updated portfolio CSV with latest data (December 2025)
     - Added 3 new projects in pipeline
     - Updated metadata with FY25 as last fiscal year

     ## Testing Done

     - ✅ Tested locally on dev server
     - ✅ Verified all charts render correctly
     - ✅ Checked filters work with new data
     - ✅ Production build succeeds

     ## Screenshots

     [Optional: Add screenshots of changes]
     ```

5. Select reviewers (if you know who should review)

6. Click **"Create pull request"**

### 9. Wait for Review

The repository maintainers will:

- Review your code/data changes
- May request changes
- Approve and merge (or reject with feedback)

### 10. Address Review Comments (if any)

If reviewers request changes:

```bash
# Make the requested changes
# Stage and commit
git add .
git commit -m "Address review comments: Fix date format"

# Push to same branch
git push origin feature/descriptive-name
```

The PR will automatically update with your new commits.

## Common Scenarios

### Updating CSV Data Only

```bash
git checkout -b data/update-fy25-q2
# Edit CSV files in src/data/
git add src/data/*.csv
git commit -m "Update Cat DDO data for FY25 Q2"
git push origin data/update-fy25-q2
# Create PR on GitHub
```

### Adding a New Feature

```bash
git checkout -b feature/add-triggers-chart
# Create new component, API endpoint, etc.
# Test locally
npm run dev
npm run build
git add .
git commit -m "Add new chart for disbursement triggers by region"
git push origin feature/add-triggers-chart
# Create PR on GitHub
```

### Fixing a Bug

```bash
git checkout -b fix/filter-reset-issue
# Fix the bug
# Test fix
git add src/components/Sidebar/Sidebar.tsx
git commit -m "Fix: Reset filters button not working"
git push origin fix/filter-reset-issue
# Create PR on GitHub
```

## Syncing with Original Repository

If the original repository has updates you want to pull:

```bash
# Add original repo as upstream (one-time setup)
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPO.git

# Fetch latest from original
git fetch upstream

# Merge into your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

## Best Practices

### Commit Messages

- Use clear, descriptive messages
- Start with verb: "Add", "Fix", "Update", "Refactor"
- Reference issue numbers if applicable: "Fix #123: Correct date parsing"

### Pull Request Descriptions

- Explain **what** changed
- Explain **why** it changed
- List **testing** performed
- Add screenshots for UI changes

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `data/` - Data updates
- `refactor/` - Code refactoring
- `docs/` - Documentation

### Code Quality

- Always run `npm run build` before creating PR
- Check `npm run typecheck` passes
- Fix all linting errors
- Add tests for new features (if applicable)

## Troubleshooting

### Pre-commit Hooks Fail

```bash
# Fix linting issues
npm run lint -- --fix

# Fix type errors (manually)
npm run typecheck

# Commit again
git commit -m "Your message"
```

### Merge Conflicts

```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-feature-branch
git merge main
# Resolve conflicts manually
git add .
git commit -m "Resolve merge conflicts"
git push origin your-feature-branch
```

### Forgot to Create Branch

```bash
# If you made changes on main branch
git checkout -b feature/my-changes
# Your changes move to new branch
git push origin feature/my-changes
# Reset main
git checkout main
git reset --hard origin/main
```

## Checklist Before Creating PR

- [ ] Changes tested locally (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code formatted correctly
- [ ] Descriptive commit messages
- [ ] Branch has meaningful name
- [ ] PR description filled out completely

## Need Review Before Pushing?

If you want feedback before creating a PR:

1. Push your branch to your fork
2. Share the branch link with team
3. They can check out your branch locally:
   ```bash
   git fetch origin
   git checkout feature/your-branch-name
   npm install
   npm run dev
   ```

---

**Remember**: Contributing to open source is collaborative! Don't be afraid to ask questions in the PR comments or reach out to maintainers.
