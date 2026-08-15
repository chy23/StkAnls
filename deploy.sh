#!/bin/bash

# 自動部署腳本 (Auto Deploy Script)
echo "🚀 準備部署更新到 GitHub..."

# 1. 抓取遠端最新變更 (避免衝突)
echo "📥 正在同步遠端進度..."
git fetch origin main
git merge -X ours --allow-unrelated-histories origin/main -m "Merge remote changes before deploy"

# 2. 將所有修改加入暫存區
echo "📦 正在封裝本地修改..."
git add .

# 3. 提交 (如果有變更的話)
if git diff-index --quiet HEAD --; then
    echo "ℹ️ 沒有偵測到檔案變更，將建立空提交觸發更新。"
    git commit --allow-empty -m "Auto deploy latest updates"
else
    echo "📝 提交檔案變更..."
    git commit -m "Auto deploy latest updates"
fi

# 4. 推播至 GitHub
echo "📤 正在上傳至 GitHub..."
# 這個步驟如果是 AI 執行，需要向使用者申請權限 (Bypass Sandbox)
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 部署指令發送成功！伺服器將自動開始建置更新。"
else
    echo "❌ 部署失敗，請檢查網路或是 Git 權限設定。"
    exit 1
fi
