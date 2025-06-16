// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    envPrefix: ['GOOGLE_SCRIPT_URL']
  },

  adapter: netlify()
});