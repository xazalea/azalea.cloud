#!/bin/bash

# Git Pull Helper Script
# Helps pull latest changes from the GitHub repository

set -e

BRANCH="${1:-main}"

echo "📥 AzaleaCloud Git Pull Helper"
echo "==============================="
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not a git repository"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes"
    git status --short
    echo ""
    read -p "Stash changes before pulling? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📦 Stashing changes..."
        git stash
        STASHED=true
    else
        echo "❌ Aborting pull to preserve your changes"
        exit 1
    fi
fi

# Pull latest changes
echo "📥 Pulling latest changes from origin/$BRANCH..."
git pull origin "$BRANCH" || {
    echo "❌ Pull failed"
    if [ "$STASHED" = true ]; then
        echo "📦 Restoring stashed changes..."
        git stash pop
    fi
    exit 1
}

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo "📦 Restoring stashed changes..."
    git stash pop || {
        echo "⚠️  Warning: Could not restore stashed changes automatically"
        echo "   Run 'git stash list' to see your stashes"
    }
fi

echo ""
echo "✅ Successfully pulled latest changes"
echo "   Branch: $BRANCH"

