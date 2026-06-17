import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE = 'https://pethomeeuthanasia.us';
const BUSINESS_ID = `${SITE}/#business`;
const WEBSITE_ID = `${SITE}/#website`;
const BUSINESS_NAME = 'Pet Home Euthanasia Service';
const BUSINESS_IMAGE = `${SITE}/assets/images/generated/home-hero-compassionate-care.png`;

function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  function walk(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir)) {
      const entryPath = path.join(currentDir, entry);
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory()) walk(entryPath);
      else if (entry.endsWith('.html')) files.push(entryPath);
    }
  }
  walk(dir);
  return files;
}

function clean(value = '') { return value.replace(/\s+/g, ' ').trim(); }

function buildFaq(root: ReturnType<typeof parse>, canonical: string) {
  const items = root.querySelectorAll('.faq-item, .city-faq-card').map((item) => {
    const q = clean(item.querySelector('h3')?.text || '');
    const a = clean(item.querySelector('p')?.text || '');
    if (!q || !a) return null;
    return { '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } };
  }).filter(Boolean);
  return items.length ? { '@type': 'FAQPage', '@id': `${canonical}#faq`, mainEntity: items } : null;
}

function serviceFor(canonical: string, pathname: string, name: string, description: string) {
  if (!pathname.startsWith('/services/') && !pathname.startsWith('/service-areas/')) return null;
  return { '@type': 'Service', '@id': `${canonical}#service`, name, description, provider: { '@id': BUSINESS_ID }, areaServed: 'Southern California', url: canonical };
}

function localBusinessSchema() {
  return {
    '@type': ['LocalBusiness', 'VeterinaryCare'],
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    url: `${SITE}/`,
    image: BUSINESS_IMAGE,
    telephone: '+1-760-912-0848',
    email: 'pethomeeuthanasiaservice@gmail.com',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Victorville',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: ['Southern California', 'San Bernardino County', 'Riverside County', 'Los Angeles County', 'Orange County'],
    openingHours: 'Mo-Su 08:00-20:00',
  };
}

export default function injectRichSchema(): AstroIntegration {
  return {
    name: 'pethome-inject-rich-schema',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;
        for (const file of collectHtmlFiles(distDir)) {
          const relPath = path.relative(distDir, file).replace(/\\/g, '/');
          if (relPath === '404.html') continue;
          const html = fs.readFileSync(file, 'utf-8');
          if (html.includes('data-rich-schema="true"')) continue;
          const root = parse(html);
          const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
          if (!canonical || !canonical.startsWith(SITE)) continue;
          const pathname = new URL(canonical).pathname.replace(/\/$/, '') || '/';
          const title = clean(root.querySelector('h1')?.text || root.querySelector('title')?.text || BUSINESS_NAME);
          const desc = clean(root.querySelector('meta[name="description"]')?.getAttribute('content') || title);
          const graph: Array<Record<string, unknown>> = [
            localBusinessSchema(),
            { '@type': 'WebSite', '@id': WEBSITE_ID, url: `${SITE}/`, name: BUSINESS_NAME, publisher: { '@id': BUSINESS_ID } },
            { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, headline: title, description: desc, image: BUSINESS_IMAGE, isPartOf: { '@id': WEBSITE_ID }, publisher: { '@id': BUSINESS_ID } },
          ];
          const service = serviceFor(canonical, pathname, title, desc);
          if (service) graph.push(service);
          const faq = buildFaq(root, canonical);
          if (faq && !html.includes('"@type": "FAQPage"')) graph.push(faq);
          root.querySelector('head')?.appendChild(parse(`<script type="application/ld+json" data-rich-schema="true">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`));
          fs.writeFileSync(file, root.toString());
          count += 1;
        }
        logger.info(`Rich schema injected into ${count} pages.`);
      },
    },
  };
}
