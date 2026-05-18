import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import checkInternalLinks from './src/plugins/check-internal-links';
import checkCanonicalUrls from './src/plugins/check-canonical-urls';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://pethomeeuthanasia.us',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    mdx(),
    checkInternalLinks(),
    checkCanonicalUrls(),
  ],
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
