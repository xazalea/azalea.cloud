import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, existsSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-webvm-build',
      buildStart() {
        // Copy WebVM build to public directory if it exists
        const webvmBuild = path.resolve(__dirname, 'webvm/build')
        const publicWebvm = path.resolve(__dirname, 'public/webvm')
        
        if (existsSync(webvmBuild)) {
          if (!existsSync(publicWebvm)) {
            mkdirSync(publicWebvm, { recursive: true })
          }
          // Copy WebVM build files
          try {
            const { execSync } = require('child_process')
            execSync(`cp -r ${webvmBuild}/* ${publicWebvm}/`, { stdio: 'ignore' })
          } catch (e) {
            // Ignore copy errors in dev mode
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  publicDir: 'public',
})

