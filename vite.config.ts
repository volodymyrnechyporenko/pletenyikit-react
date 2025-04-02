import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.BUILD_DATE': JSON.stringify(
      new Date().toISOString().split('T')[0],
    ),
  },
});
