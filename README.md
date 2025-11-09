# AzaleaCloud

A free cloud computing service with a beautiful, modern interface built with TypeScript and React.

## Features

- 🎨 Beautiful UI with Lavender Sapphire Mist color palette
- 🌓 Dark and Light mode support
- 💻 **Multiple Provider Options**:
  - **AzaleaCloud**: Cloud shell with unlimited access
  - **AzaleaSSHX**: WebVM with sshx.io integration for shared sessions
  - **AzaleaLocal**: Standalone WebVM running entirely in the browser
- 🔐 Automatic authentication key management
- 🔄 Background token refresh using metadata server
- 👥 **Unlimited user access with automated service account creation**
- 🔑 **Automated key generation and distribution**
- 📊 **Account management UI**
- 🤖 **Background workers for automation**
- 📁 File management (coming soon)
- ⚙️ Settings panel (coming soon)

> **Note**: This repository contains the Vite/React implementation with cloud shell capabilities. For the Next.js/VNC desktop version, see the `nextjs-vnc` branch or check the documentation files in the repository.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git (for submodule support)

### Installation

```bash
# Clone the repository
git clone https://github.com/xazalea/azalea.cloud.git
cd azalea-cloud

# Initialize and update submodules (includes WebVM)
git submodule update --init --recursive

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Styling**: CSS-in-JS with theme system
- **Terminal**: xterm.js
- **Database**: Firebase Realtime Database
- **Authentication**: Metadata server strategy for Google Cloud

## Project Structure

```
azalea-cloud/
├── src/              # Main application code
│   ├── components/   # React components
│   ├── theme/        # Theme system
│   └── config/       # Configuration files
├── lib/              # Library code
│   └── auth/         # Authentication modules
└── public/           # Static assets
```

## Authentication Strategy

AzaleaCloud uses a metadata server authentication strategy that:

1. Automatically fetches access tokens from the Google Cloud metadata server
2. Stores tokens in Firebase Realtime Database
3. Refreshes tokens in the background before expiration
4. Manages token lifecycle automatically

### Metadata Server Endpoint
```
http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
```

## Unlimited Access System

AzaleaCloud provides unlimited access through automated service account management:

1. **Automated Account Creation**: Creates service accounts for users automatically
2. **Key Generation**: Generates and distributes service account keys
3. **Metadata Management**: Sets custom metadata on compute instances
4. **Background Workers**: Runs periodic tasks for automation

### Quick Start

1. **Create an Account**:
   - Navigate to the Accounts tab
   - Click "Create Account"
   - System automatically creates service account and generates keys

2. **Automated Scripts**:
   ```bash
   # Generate keys
   npm run generate-keys
   
   # Set metadata
   npm run set-metadata <instance> <zone> <token>
   
   # Schedule jobs
   npm run schedule-jobs
   ```

3. **Cron Jobs**: See `cron.example` for automated scheduling

See [ACCOUNT_MANAGEMENT.md](./ACCOUNT_MANAGEMENT.md) for detailed documentation.

## Git Workflow

This repository is connected to: **https://github.com/xazalea/azalea.cloud**

### Quick Commands

```bash
# Pull latest changes
npm run git-pull

# Push changes
npm run git-push

# Or use git directly
git pull origin main
git push origin main
```

See [GIT_SETUP.md](./GIT_SETUP.md) for detailed git workflow.

## Related Documentation

The repository also includes documentation for alternative implementations:
- [GOOGLE_PROXY_GUIDE.md](./GOOGLE_PROXY_GUIDE.md) - Google Proxy integration guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide

## License

MIT

---

Built with ❤️ using Vite, React, and TypeScript

**AzaleaCloud** - Free Cloud Computing, Accessible to Everyone.
