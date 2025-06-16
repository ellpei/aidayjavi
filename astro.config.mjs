// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    envPrefix: ['GOOGLE_SCRIPT_URL']
  }
});
