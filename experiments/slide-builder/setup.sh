#!/bin/bash
# ── First-time setup: run once to create repo and go live ──
set -e
REPO="discrafty-cpu/slide-builder"
GITHUB_USER="discrafty-cpu"

echo ""
echo "▶  First-time setup: $REPO"
echo "────────────────────────────────"

if [ ! -d ".git" ]; then git init && git branch -M main; fi
if ! git remote get-url origin &>/dev/null; then git remote add origin "https://github.com/$REPO.git"; fi

git add .
git commit -m "Initial commit" 2>/dev/null || true
git push -u origin main

gh api repos/$REPO/pages --method POST \
  -H "Accept: application/vnd.github+json" \
  -f "source[branch]=main" \
  -f "source[path]=/" 2>/dev/null || true

echo ""
echo "✅  Live at: https://$GITHUB_USER.github.io/$(basename $REPO)/"
echo ""
