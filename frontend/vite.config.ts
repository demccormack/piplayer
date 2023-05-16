/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './vitest.setup.ts',
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
