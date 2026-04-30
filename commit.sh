#!/bin/bash
# commit.sh — Auto-update timestamp + commit + push
# Usage: bash commit.sh "your commit message"

MSG="${1:-Update planner content}"

# Get Taiwan time (Asia/Taipei UTC+8)
TIMESTAMP=$(TZ="Asia/Taipei" date "+%Y-%m-%d %H:%M (Asia/Taipei)")

echo "Updating timestamp: $TIMESTAMP"

# Update lastUpdated field in plan.js
sed -i '' "s|lastUpdated: \".*\"|lastUpdated: \"$TIMESTAMP\"|" plan.js

# Commit and push
git add -A
git commit -m "$MSG [$TIMESTAMP]"
git push

echo "Done! GitHub Pages will update in ~1-3 minutes."
