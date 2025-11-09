# Git Repository Setup

This repository is configured to push and pull from:
**https://github.com/xazalea/azalea.cloud**

## Quick Commands

### First Time Setup

If this is your first time setting up:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: AzaleaCloud with unlimited access system"

# Push to main branch
git push -u origin main
```

### Daily Workflow

```bash
# Pull latest changes
git pull origin main

# After making changes
git add .
git commit -m "Your commit message"
git push origin main
```

### Branch Workflow

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make changes, then commit
git add .
git commit -m "Add feature description"

# Push branch
git push -u origin feature/your-feature-name

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/your-feature-name
```

## Important Notes

⚠️ **Security**: The following files are ignored and will NOT be committed:
- `azaleacompute-*.json` - Service account credentials
- `keys/` - Generated key files
- `.env*` - Environment variables
- `node_modules/` - Dependencies

✅ **Safe to Commit**:
- All source code
- Configuration files (package.json, tsconfig.json, etc.)
- Documentation
- Scripts

## Remote Configuration

The repository is configured with:
- **Remote name**: `origin`
- **URL**: `https://github.com/xazalea/azalea.cloud.git`
- **Default branch**: `main`

## Troubleshooting

### If you get authentication errors:
```bash
# Use GitHub CLI
gh auth login

# Or use SSH instead
git remote set-url origin git@github.com:xazalea/azalea.cloud.git
```

### If you need to reset remote:
```bash
git remote remove origin
git remote add origin https://github.com/xazalea/azalea.cloud.git
```

### To check current status:
```bash
git status
git remote -v
git branch -a
```

