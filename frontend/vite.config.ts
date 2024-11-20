import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'APP_PORT');

  return {
    base: '/',
    envPrefix: 'APP_',
    plugins: [react()],
    server: {
      port: parseInt(env.APP_PORT),
      strictPort: true,
    },
    preview: {
      port: parseInt(env.APP_PORT),
      strictPort: true,
      open: 'index.html',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
