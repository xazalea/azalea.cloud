import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'

// Get git commit info at build time
function getGitCommitInfo() {
  // Check Vercel environment variables first (available during Vercel builds)
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return {
      hash: process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7),
      message: process.env.VERCEL_GIT_COMMIT_MESSAGE || 'No commit message'
    }
  }
  
  // Fallback to git command (for local builds)
  try {
    const hash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
    const message = execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf-8' }).trim()
    return { hash, message }
  } catch (e) {
    // If git is not available, return defaults
    return { hash: 'unknown', message: 'No commit info' }
  }
}

const commitInfo = getGitCommitInfo()

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
            execSync(`cp -r ${webvmBuild}/* ${publicWebvm}/`, { stdio: 'ignore' })
          } catch (e) {
            // Ignore copy errors in dev mode
          }
        }
      }
    }
  ],
  define: {
    'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(commitInfo.hash),
    'import.meta.env.VITE_COMMIT_MESSAGE': JSON.stringify(commitInfo.message),
  },
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

