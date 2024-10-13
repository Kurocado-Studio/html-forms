// eslint-disable-next-line import/default
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// needed this way by vitest
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      // @ts-expect-error since its 'c8' custom
      provider: 'c8',
      reporter: ['text', 'html'],
    },
    css: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: './setup.react.ts',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
