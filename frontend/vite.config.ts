import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_PORT');

  return {
    base: './',
    envPrefix: 'VITE_',
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT),
      strictPort: true,
    },
    preview: {
      port: parseInt(env.VITE_PORT),
      strictPort: true,
      open: 'index.html',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      setupFiles: 'src/tests/setup.ts',
      environment: 'jsdom',
      exclude: ['**/node_modules/**'],
      tsconfig: './tsconfig.test.json',
      coverage: {
        include: ['src/**'],
        reporter: ['text', 'json', 'html'],
      },
    },
    cacheDir: 'node_modules/.vite_cache',
  };
});
