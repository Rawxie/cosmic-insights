// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    includeFiles: ['./src/pages/api/**/*'],
    maxDuration: 5
  }),
  integrations: [
    tailwind(),
    react()
  ]
});