#!/bin/bash
# ── Run ONCE to push this project to GitHub and go live ──
set -e
REPO="discrafty-cpu/slide-demo-app"
GITHUB_USER="discrafty-cpu"

echo ""
echo "▶  SlideDemo — First-time setup"
echo "────────────────────────────────"

# Init git if needed
if [ ! -d ".git" ]; then
  echo "→ Initializing git..."
  git init
  git branch -M main
fi

# Add remote if needed
if ! git remote get-url origin &>/dev/null; then
  echo "→ Connecting to GitHub..."
  git remote add origin "https://github.com/$REPO.git"
fi

# Commit and push
echo "→ Committing files..."
git add .
git commit -m "Initial commit: SlideDemo app" 2>/dev/null || echo "   (nothing new to commit)"
echo "→ Pushing to GitHub..."
git push -u origin main

# Enable GitHub Pages
echo "→ Enabling GitHub Pages..."
gh api repos/$REPO/pages \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  --field source='{"branch":"main","path":"/"}' 2>/dev/null \
  && echo "   ✓ GitHub Pages enabled!" \
  || echo "   (Pages may already be enabled — that's fine)"

echo ""
echo "✅  All done! Your app will be live at:"
echo "    https://$GITHUB_USER.github.io/slide-demo-app/"
echo ""
echo "    (Takes ~1 minute to go live the first time)"
echo ""
