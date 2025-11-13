import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**'],
        usePolling: false
      },
      fs: {
        strict: false
      }
    }
  }
});
