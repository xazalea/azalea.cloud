# AzaleaCloud

A free cloud computing service with a beautiful, modern interface built with TypeScript and React.

## Features

- 🎨 Beautiful UI with Lavender Sapphire Mist color palette
- 🌓 Dark and Light mode support
- 💻 Full-featured terminal interface
- 🔐 Automatic authentication key management
- 🔄 Background token refresh using metadata server
- 👥 **Unlimited user access with automated service account creation**
- 🔑 **Automated key generation and distribution**
- 📊 **Account management UI**
- 🤖 **Background workers for automation**
- 📁 File management (coming soon)
- ⚙️ Settings panel (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
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

## License

MIT

