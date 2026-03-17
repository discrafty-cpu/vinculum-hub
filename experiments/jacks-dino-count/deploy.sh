#!/bin/bash
REPO=jacks-dino-count

git add -A
git commit -m "Update - $(date '+%Y-%m-%d %H:%M')"
git push origin main

echo ""
echo "✅ Deployed!"
echo "🌐 https://discrafty-cpu.github.io/$REPO/"
