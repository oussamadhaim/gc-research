import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        method: resolve(__dirname, 'method.html'),
        research: resolve(__dirname, 'research.html'),
        applications: resolve(__dirname, 'applications.html'),
        insights: resolve(__dirname, 'insights.html'),
        academic_use: resolve(__dirname, 'academic-use.html'),
        contact: resolve(__dirname, 'contact.html'),
        theory_of_temporal_arcs: resolve(__dirname, 'theory-of-temporal-arcs.html'),
        ac_stop: resolve(__dirname, 'ac-stop.html'),
      },
    },
  },
});
