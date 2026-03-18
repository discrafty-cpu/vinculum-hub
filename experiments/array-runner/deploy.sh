#!/bin/bash
# ── Push updates live ──
set -e
REPO="discrafty-cpu/array-runner"   # ← change this
GITHUB_USER="discrafty-cpu"
echo ""
git add . && git commit -m "Update: $(date '+%Y-%m-%d %H:%M')" && git push origin main
echo "✅  Live at: https://$GITHUB_USER.github.io/$(basename $REPO)/"
echo ""
