#!/bin/bash
# ── Run any time you update index.html to push changes live ──
set -e
echo ""
echo "▶  Deploying update..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo ""
echo "✅  Live at: https://discrafty-cpu.github.io/slide-demo-app/"
echo ""
