# AzaleaCloud Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Features Implemented

### ✅ UI Components
- **Header**: Branding, user email (azalea.compute@gmail.com), theme toggle
- **Sidebar**: Navigation with Terminal, Files, Auth Keys, Settings tabs
- **Terminal**: Full-featured terminal using xterm.js with command execution
- **Auth Keys**: View and manage authentication tokens

### ✅ Theme System
- Lavender Sapphire Mist color palette
- Dark and Light mode support
- Smooth transitions
- Matte design with minimal animations

### ✅ Authentication
- Metadata server authentication strategy
- Background token refresh manager
- Firebase Realtime Database integration
- Automatic token storage and cleanup

### ✅ TypeScript Conversion
- Converted shell.html configuration to TypeScript
- Converted api.js Google API loader to TypeScript
- Modular architecture with lib/ folder structure

## Project Structure

```
azalea-cloud/
├── src/
│   ├── components/      # React components
│   │   ├── Terminal/    # Terminal component
│   │   ├── Header/      # Header component
│   │   ├── Sidebar/     # Sidebar navigation
│   │   └── AuthKeys/    # Auth key management
│   ├── theme/           # Theme system
│   ├── config/          # Configuration (Firebase)
│   ├── services/        # Business logic services
│   └── main.tsx         # Entry point
├── lib/
│   ├── auth/            # Authentication modules
│   │   ├── metadataAuth.ts      # Metadata server auth
│   │   └── authKeyService.ts    # Firebase auth key service
│   ├── api/             # API modules
│   │   └── gapiLoader.ts        # Google API loader
│   └── config/          # Configuration
│       └── cloudConfig.ts       # Cloud shell config
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Color Palette (Lavender Sapphire Mist)

- **Lavender**: #D9A69F
- **Sapphire**: #6C739C
- **Mist**: #F0DAD5
- **Stone**: #BABBB1
- **Rose**: #C56B62
- **Midnight**: #424658
- **Peach**: #DEA785

## Authentication Strategy

The application implements a metadata server authentication strategy:

1. **Automatic Token Fetching**: Queries Google Cloud metadata server for access tokens
2. **Background Refresh**: Automatically refreshes tokens before expiration
3. **Database Storage**: Stores tokens in Firebase Realtime Database
4. **Token Management**: Provides UI to view and manage stored tokens

### Metadata Server Endpoint
```
http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
```

## Firebase Configuration

Firebase is configured with:
- Realtime Database for auth key storage
- Analytics enabled
- Project: azalea-compute

## Development Notes

- The terminal component uses xterm.js for terminal emulation
- Theme system supports both light and dark modes
- All components are written in TypeScript
- Modular architecture allows for easy extension

## Next Steps

1. Install dependencies: `npm install`
2. Configure Firebase if needed (already configured)
3. Start development: `npm run dev`
4. Build for production: `npm run build`

## Troubleshooting

If you encounter module resolution errors:
- Make sure all dependencies are installed: `npm install`
- Check that TypeScript is properly configured
- Verify Node.js version is 18+

