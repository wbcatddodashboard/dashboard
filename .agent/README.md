# .agent Directory - Your Dashboard Companion

Welcome! This directory contains comprehensive guides to help you understand, test, modify, and contribute to the World Bank Cat DDO Dashboard.

## 📚 Documentation Index

### 🎯 Start Here

1. **[copilot.md](copilot.md)** - **MUST READ FIRST!**
   - Complete project overview
   - Technology stack explanation (for Python developers)
   - How data flows through the system
   - Key components and their purpose
   - TypeScript/JavaScript crash course
   - Getting started guide

### 🔧 Workflows (How-To Guides)

2. **[workflows/test-locally.md](workflows/test-locally.md)** - Testing Locally
   - Step-by-step guide to run dashboard on your machine
   - Installation and setup
   - Common issues and solutions
   - Slash command: `/test-locally`

3. **[workflows/contributing.md](workflows/contributing.md)** - Contributing Changes
   - Git workflow for making changes
   - Creating branches and pull requests
   - Best practices for commits
   - How to propose changes to original project
   - Slash command: `/contributing`

### 📖 Reference Guides

4. **[typescript-for-python-devs.md](typescript-for-python-devs.md)** - Quick Reference
   - Side-by-side comparison: Python ↔ TypeScript
   - Common patterns and idioms
   - React hooks explained
   - Debugging tips
   - **Bookmark this for daily use!**

5. **[architecture.md](architecture.md)** - Architecture Overview
   - System architecture diagrams
   - Component hierarchy
   - Data flow examples
   - API endpoint map
   - Design patterns used

6. **[troubleshooting.md](troubleshooting.md)** - Troubleshooting Guide
   - Common errors and solutions
   - Installation issues
   - Build problems
   - Git/Husky issues
   - Debugging checklist

## 🚀 Quick Start Path

### For Complete Beginners:

1. Read **copilot.md** (sections: Overview, Tech Stack, Getting Started)
2. Follow **test-locally.md** to run dashboard
3. Bookmark **typescript-for-python-devs.md** for reference
4. When issues arise, check **troubleshooting.md**

### For Making Changes:

1. Read **copilot.md** (sections: Making Changes, File Structure)
2. Review **architecture.md** to understand where to edit
3. Follow **contributing.md** to create pull request
4. Use **typescript-for-python-devs.md** as cheat sheet

### For Understanding the Code:

1. Read **architecture.md** for big picture
2. Read **copilot.md** (section: How Data Flows)
3. Explore codebase with understanding from above
4. Reference **typescript-for-python-devs.md** when confused

## 📋 File Summary

| File                              | Size   | Purpose                      | When to Use                               |
| --------------------------------- | ------ | ---------------------------- | ----------------------------------------- |
| **copilot.md**                    | ~15 KB | Main guide, project overview | First time, general understanding         |
| **test-locally.md**               | ~3 KB  | Local testing workflow       | Setting up dev environment                |
| **contributing.md**               | ~8 KB  | Git workflow for PRs         | Making and submitting changes             |
| **typescript-for-python-devs.md** | ~12 KB | Language reference           | Daily coding, syntax questions            |
| **architecture.md**               | ~10 KB | System design docs           | Understanding structure, planning changes |
| **troubleshooting.md**            | ~9 KB  | Problem solving              | When things go wrong                      |

## 🎓 Recommended Learning Path

### Week 1: Getting Oriented

- [ ] Day 1-2: Read copilot.md completely
- [ ] Day 3: Follow test-locally.md, run dashboard
- [ ] Day 4-5: Explore codebase, understand structure
- [ ] Day 6-7: Read architecture.md, understand data flow

### Week 2: Making First Changes

- [ ] Day 1-2: Make small data update (CSV change)
- [ ] Day 3-4: Make small code change (text, styling)
- [ ] Day 5: Read contributing.md, create first PR
- [ ] Day 6-7: Review TypeScript patterns in existing code

### Week 3: Deeper Understanding

- [ ] Day 1-3: Study lib/portfolio.ts (main logic)
- [ ] Day 4-5: Study API routes and components
- [ ] Day 6-7: Make meaningful feature addition or fix

## 💡 Pro Tips

### For Python Developers

1. **Don't panic!** TypeScript is just JavaScript with types (like Python type hints)
2. **Think in components** - Like Python classes, but for UI
3. **Async is everywhere** - Similar to Python's asyncio
4. **Use the cheat sheet** - typescript-for-python-devs.md is your friend

### General Tips

1. **Start small** - Update CSV, then move to code
2. **Use VS Code** - Best TypeScript/React support
3. **Read error messages** - They're usually helpful
4. **Google is your friend** - Most errors have StackOverflow answers
5. **Test locally first** - Always run `npm run dev` before committing

## 🔗 External Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [React Docs](https://react.dev) - UI library documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Language docs
- [TailwindCSS](https://tailwindcss.com/docs) - Styling framework

### Interactive Tutorials

- [Next.js Learn](https://nextjs.org/learn) - Official Next.js tutorial
- [React Tutorial](https://react.dev/learn) - Official React tutorial
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try TypeScript online

### For Python Developers

- [TypeScript for Python Devs](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [JavaScript for Python Developers](https://dev.to/rajdurvasula/python-vs-node-js-comparison-3h13)

## 🆘 Getting Help

### In Order of Escalation:

1. **Check troubleshooting.md** - Common issues covered
2. **Google the error** - Someone likely had same problem
3. **Check browser console** - F12, look for errors
4. **Review relevant docs** - copilot.md or architecture.md
5. **Ask for help** - Include error, code, what you tried

### When Asking for Help:

```markdown
## Issue Description

[What you were trying to do]

## Error Message
```

[Paste exact error]

```

## What I Tried
- Checked troubleshooting.md
- Tried X, Y, Z
- Googled "[error message]"

## Environment
- Node version: [run `node --version`]
- Branch: [run `git branch`]
- Recent changes: [what did you change?]
```

## 📊 Dashboard Quick Facts

- **Framework:** Next.js 15 (React)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Data Source:** CSV files in `src/data/`
- **Deployment:** Vercel
- **Git:** Main branch auto-deploys

## 🗂️ Key Directories

```
catddodashboard_forkDec2025/
├── src/
│   ├── app/              ← Pages & API routes
│   ├── components/       ← React UI components
│   ├── contexts/         ← Global state
│   ├── data/             ← CSV DATA FILES
│   ├── lib/              ← Business logic (IMPORTANT!)
│   ├── hooks/            ← Custom React hooks
│   └── utils/            ← Utility functions
├── public/               ← Static assets
├── .agent/               ← YOU ARE HERE
└── package.json          ← Dependencies (like requirements.txt)
```

## 🎯 Most Important Files

1. **`src/lib/portfolio.ts`** - All data processing logic (577 lines)
2. **`src/data/*.csv`** - Your data source
3. **`.agent/copilot.md`** - This documentation
4. **`package.json`** - Dependencies and scripts

## 🔑 Common Commands

```bash
# Install dependencies
npm install

# Run dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Check types
npm run typecheck

# Lint code
npm run lint

# Run tests
npm run test
```

## 📝 Making Changes Checklist

Before committing:

- [ ] Code tested locally (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] Types check (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Changes documented in commit message
- [ ] CSV data valid if changed

## 🎉 You're Ready!

You now have all the documentation you need to:

- ✅ Understand the dashboard architecture
- ✅ Run and test locally
- ✅ Make changes to code and data
- ✅ Contribute back to the project
- ✅ Debug issues when they arise

**Start with copilot.md and good luck!** 🚀

---

**Last Updated:** December 2025  
**Maintained by:** jqnmunozdiaz  
**Questions?** Check troubleshooting.md or contributing.md
