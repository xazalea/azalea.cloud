#!/bin/bash

# Git Push Helper Script
# Helps push changes to the GitHub repository

set -e

REPO_URL="https://github.com/xazalea/azalea.cloud.git"
BRANCH="${1:-main}"
COMMIT_MSG="${2:-Update AzaleaCloud}"

echo "🚀 AzaleaCloud Git Push Helper"
echo "================================"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ "$REMOTE_URL" != "$REPO_URL" ]; then
    echo "⚠️  Warning: Remote URL doesn't match expected repository"
    echo "   Current: $REMOTE_URL"
    echo "   Expected: $REPO_URL"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for changes
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No changes to commit"
    exit 0
fi

# Show status
echo "📊 Current status:"
git status --short
echo ""

# Add all changes
echo "➕ Adding all changes..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG" || {
    echo "❌ Commit failed (maybe no changes?)"
    exit 1
}

# Push
echo "📤 Pushing to origin/$BRANCH..."
git push origin "$BRANCH" || {
    echo "❌ Push failed"
    echo "💡 Try: git push -u origin $BRANCH (if first time)"
    exit 1
}

echo ""
echo "✅ Successfully pushed to $REPO_URL"
echo "   Branch: $BRANCH"
echo "   Commit: $COMMIT_MSG"

