import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@data': path.resolve(__dirname, './src/data/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@router': path.resolve(__dirname, './src/router/'),
    },
  },
});
