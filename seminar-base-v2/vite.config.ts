import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // ← 이 줄 추가
    },
  },
  // GitHub Pages 배포 시: base: "/<REPO_NAME>/"
})