// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import Analytics from '@vercel/analytics/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    maxDuration: 10,
    includeFiles: ['./src/pages/api/**/*']
  }),
  integrations: [
    tailwind(),
    react(),
    Analytics()
  ],
  server: {
    port: 4321,
    host: true
  }
});