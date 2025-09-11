import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Derive base path for GitHub Pages when building in Actions
const repo = process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? '';
const isCI = process.env.GITHUB_ACTIONS === 'true';
const base = process.env.VITE_BASE_PATH ?? (isCI && repo ? `/${repo}/` : '/');

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
