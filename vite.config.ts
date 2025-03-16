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
      '@constants': path.resolve(__dirname, './src/constants/'),
      '@data': path.resolve(__dirname, './src/data/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
      '@interfaces': path.resolve(__dirname, './src/interfaces/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@router': path.resolve(__dirname, './src/router/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
  },
});
