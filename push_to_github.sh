#!/bin/bash

# GitHubへのpushスクリプト
# Personal Access Tokenを使用してHTTPSでpushします

cd /Users/kawamotonaoki/moc_stk

echo "=========================================="
echo "GitHubへのpushスクリプト"
echo "=========================================="
echo ""
echo "Personal Access Tokenが必要です。"
echo "まだ取得していない場合は、以下のURLから取得してください："
echo "https://github.com/settings/tokens/new"
echo ""
echo "スコープで 'repo' にチェックを入れてください。"
echo ""
read -p "Personal Access Tokenを入力してください: " TOKEN

if [ -z "$TOKEN" ]; then
    echo "エラー: トークンが入力されていません。"
    exit 1
fi

echo ""
echo "pushを実行します..."
git push https://naokkawamoto:${TOKEN}@github.com/naokkawamoto/stk.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ pushが成功しました！"
    echo ""
    echo "次回からは、以下のコマンドでpushできます："
    echo "git push -u origin main"
    echo ""
    echo "（認証情報がキーチェーンに保存されます）"
else
    echo ""
    echo "❌ pushに失敗しました。"
    echo "トークンが正しいか、リポジトリへのアクセス権限があるか確認してください。"
fi
