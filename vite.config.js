import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        research: resolve(__dirname, 'research.html'),
        publications: resolve(__dirname, 'publications.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
