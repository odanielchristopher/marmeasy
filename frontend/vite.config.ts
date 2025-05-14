import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: false,
  },
  resolve: {
    alias: {
      '@views': path.resolve(__dirname, 'src', 'views'),
      '@app': path.resolve(__dirname, 'src', 'app'),
    },
  },
});
