#!/bin/bash
# commit.sh — 一鍵更新時間戳 + commit + push
# 使用方式：bash commit.sh "你的 commit 訊息"

MSG="${1:-Update planner content}"

# 取得台灣時間（Asia/Taipei UTC+8）
TIMESTAMP=$(TZ="Asia/Taipei" date "+%Y-%m-%d %H:%M (Asia/Taipei)")

echo "📅 更新時間戳：$TIMESTAMP"

# 用 sed 直接替換 plan.js 中的 lastUpdated 欄位
sed -i '' "s|lastUpdated: \".*\"|lastUpdated: \"$TIMESTAMP\"|" plan.js

# git add、commit、push
git add -A
git commit -m "$MSG（$TIMESTAMP）"
git push

echo "✅ 已推送至 GitHub！約 1-3 分鐘後 GitHub Pages 生效。"
