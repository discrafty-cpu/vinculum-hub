#!/bin/bash
# ── TEMPLATE: Edit the two lines below, then run once ──
set -e
REPO="discrafty-cpu/array-runner"    # ← change this
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
  --field source='{"branch":"main","path":"/"}' 2>/dev/null || true

echo ""
echo "✅  Live at: https://$GITHUB_USER.github.io/$(basename $REPO)/"
echo ""
