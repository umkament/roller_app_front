import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
//import vitePluginSass from 'vite-plugin-sass'

export default defineConfig({
  base: '/roller_app_front/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
