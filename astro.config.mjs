import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import normalizeSeoUrls from './src/plugins/normalize-seo-urls';
import enhanceServicesHub from './src/plugins/enhance-services-hub';
import enhanceCityPages from './src/plugins/enhance-city-pages';
import injectInternalLinking from './src/plugins/inject-internal-linking';
import injectBreadcrumbSchema from './src/plugins/inject-breadcrumb-schema';
import injectRichSchema from './src/plugins/inject-rich-schema';
import injectDesignPolish from './src/plugins/inject-design-polish';
import checkInternalLinks from './src/plugins/check-internal-links';
import checkCanonicalUrls from './src/plugins/check-canonical-urls';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://pethomeeuthanasia.us',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    mdx(),
    normalizeSeoUrls(),
    enhanceServicesHub(),
    enhanceCityPages(),
    injectInternalLinking(),
    injectBreadcrumbSchema(),
    injectRichSchema(),
    injectDesignPolish(),
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
