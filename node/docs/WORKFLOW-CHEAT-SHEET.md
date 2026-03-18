# VINCULUM Project — Git & File Workflow Cheat Sheet

A quick-reference guide for keeping your local files, GitHub repos, and Claude sessions clean and in sync.

---

## Golden Rule

**GitHub is the single source of truth.** Your local copies are just working checkouts. If something exists on GitHub, that's the real version.

---

## Before You Start Any Work Session

```bash
# Go to the repo you're about to work on
cd ~/vinculum-hub          # or ~/lesson-digester, etc.

# Pull the latest from GitHub
git pull origin main

# Check that you're on the right branch and clean
git status
```

If the folder doesn't exist yet, clone it first:
```bash
cd ~
gh repo clone discrafty-cpu/vinculum-hub
```

---

## Before Editing Any File

```bash
# Always check what's already there
git log --oneline -5       # See recent commits
git status                 # See if anything is modified
```

This prevents the "stale clone" problem — where you edit an old version of a file that's already been updated on GitHub.

---

## After Making Changes

```bash
# Stage specific files (not git add .)
git add indigenous-context-panel.js indigenous-data.json

# Commit with a clear message
git commit -m "Add Indigenous context engine panel to Hub"

# Push to GitHub
git push origin main
```

**Why `git add <filename>` instead of `git add .`?**
Using `git add .` can accidentally include files you didn't mean to commit (temp files, .DS_Store, credentials). Naming files explicitly keeps things safe.

---

## If You're Not Sure What Changed

```bash
git diff                   # See unstaged changes
git diff --staged          # See what's about to be committed
git diff main..HEAD        # See all changes since main
```

---

## Repo Locations on Your Mac

| Repo | Local Path | GitHub URL |
|------|-----------|------------|
| VINCULUM Hub | `~/vinculum-hub` | `discrafty-cpu/vinculum-hub` |
| Indigenous Data | `~/VINCULUM/indigenous_data` | `discrafty-cpu/indigenous-math-integration` |
| Lesson Digester | `~/lesson-digester` | `discrafty-cpu/lesson-digester` |

---

## Common Mistakes & How to Avoid Them

**Mistake: Editing a file that's out of date**
→ Fix: Always `git pull` before you start working

**Mistake: Having two copies of the same repo**
→ Fix: Only keep one local clone per repo. If you find duplicates, check `git log` in each to see which is current, keep that one, delete the other

**Mistake: Creating files in random folders**
→ Fix: Always work inside the cloned repo folder. New files go there, not on the Desktop or in Downloads

**Mistake: Forgetting to push after committing**
→ Fix: `git push` right after `git commit`. Your work isn't "saved" until it's on GitHub

**Mistake: Committing .DS_Store or other junk**
→ Fix: Your `.gitignore` should catch most of these. If something slips through:
```bash
git rm --cached .DS_Store
echo ".DS_Store" >> .gitignore
git commit -m "Remove .DS_Store from tracking"
```

---

## Quick Reference Commands

| What you want | Command |
|--------------|---------|
| See what's changed | `git status` |
| Pull latest from GitHub | `git pull origin main` |
| See commit history | `git log --oneline -10` |
| Undo changes to a file | `git checkout -- filename` |
| See what a file looks like on GitHub | `git show main:filename` |
| Clone a repo you don't have locally | `gh repo clone discrafty-cpu/REPO-NAME` |

---

## When Working with Claude

- Tell Claude which repo folder you're working in
- Ask Claude to run `git status` and `git pull` first
- If Claude creates files, make sure they end up inside the repo folder (not in a sandbox or temp location)
- After Claude edits files, review with `git diff` before committing

---

*Created March 2026 — update as your project grows.*
