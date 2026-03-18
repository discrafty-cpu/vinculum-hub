#!/bin/bash
REPO=jacks-dino-count

git init
git add -A
git commit -m "Initial commit - Jack's Dinosaur Counting Adventure"

gh repo create "$REPO" --public --source=. --remote=origin --push

# Enable GitHub Pages on main branch
gh api -X POST "repos/discrafty-cpu/$REPO/pages" \
  -f source='{"branch":"main","path":"/"}' \
  --input - <<EOF
{
  "source": {
    "branch": "main",
    "path": "/"
  }
}
EOF

echo ""
echo "✅ Setup complete!"
echo "🌐 Your site will be live at: https://discrafty-cpu.github.io/$REPO/"
echo "   (may take a minute to publish)"
