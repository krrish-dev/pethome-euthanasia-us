import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE_ORIGIN = 'https://pethomeeuthanasia.us';
const LEGACY_ORIGIN = 'https://pethomeeuthanasiaservice.com';

function collectFiles(dir: string, predicate: (entry: string) => boolean): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir)) {
      const entryPath = path.join(currentDir, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        walk(entryPath);
      } else if (predicate(entry)) {
        files.push(entryPath);
      }
    }
  }

  walk(dir);
  return files;
}

function splitSuffix(value: string): { base: string; suffix: string } {
  const hashIndex = value.indexOf('#');
  const queryIndex = value.indexOf('?');
  const indexes = [hashIndex, queryIndex].filter((index) => index >= 0);

  if (!indexes.length) {
    return { base: value, suffix: '' };
  }

  const splitAt = Math.min(...indexes);
  return {
    base: value.slice(0, splitAt),
    suffix: value.slice(splitAt),
  };
}

function normalizePathname(pathname: string): string {
  let cleanPath = pathname;

  if (cleanPath === '' || cleanPath === '/index.html') {
    return '/';
  }

  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  if (cleanPath.endsWith('/index.html')) {
    cleanPath = cleanPath.slice(0, -'index.html'.length);
  }

  if (cleanPath.endsWith('.html')) {
    cleanPath = cleanPath.slice(0, -'.html'.length);
  }

  while (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  return cleanPath || '/';
}

function normalizeInternalHref(href: string): string {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  const { base, suffix } = splitSuffix(href);

  if (base.startsWith(SITE_ORIGIN) || base.startsWith(LEGACY_ORIGIN)) {
    const parsed = new URL(base);
    return `${SITE_ORIGIN}${normalizePathname(parsed.pathname)}${suffix}`;
  }

  if (!base.startsWith('/')) {
    return href;
  }

  return `${normalizePathname(base)}${suffix}`;
}

function normalizeCanonicalHref(href: string): string {
  if (!href) {
    return href;
  }

  if (href.startsWith(SITE_ORIGIN) || href.startsWith(LEGACY_ORIGIN)) {
    const parsed = new URL(href);
    return `${SITE_ORIGIN}${normalizePathname(parsed.pathname)}`;
  }

  if (href.startsWith('/')) {
    return `${SITE_ORIGIN}${normalizePathname(href)}`;
  }

  return href;
}

function normalizeSitemapXml(xml: string): string {
  return xml.replace(/<loc>([^<]+)<\/loc>/g, (_match, loc: string) => {
    if (!loc.startsWith(SITE_ORIGIN) && !loc.startsWith(LEGACY_ORIGIN)) {
      return `<loc>${loc}</loc>`;
    }

    const parsed = new URL(loc);
    return `<loc>${SITE_ORIGIN}${normalizePathname(parsed.pathname)}</loc>`;
  });
}

export default function normalizeSeoUrls(): AstroIntegration {
  return {
    name: 'pethome-normalize-seo-urls',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let normalizedHtmlFiles = 0;
        let normalizedXmlFiles = 0;

        for (const file of collectFiles(distDir, (entry) => entry.endsWith('.html'))) {
          const original = fs.readFileSync(file, 'utf-8');
          const root = parse(original);

          for (const link of root.querySelectorAll('a[href]')) {
            const href = link.getAttribute('href');
            if (!href) {
              continue;
            }

            const normalizedHref = normalizeInternalHref(href);
            if (normalizedHref !== href) {
              link.setAttribute('href', normalizedHref);
            }

            if (href === `${LEGACY_ORIGIN}/` && link.text.trim().toLowerCase() === 'pet home euthanasia near me') {
              link.set_content('Official Pet Home Euthanasia Service');
              link.setAttribute('rel', 'noopener');
            }
          }

          const canonicalLink = root.querySelector('link[rel="canonical"]');
          if (canonicalLink) {
            const href = canonicalLink.getAttribute('href');
            if (href) {
              canonicalLink.setAttribute('href', normalizeCanonicalHref(href));
            }
          }

          const normalized = root.toString();
          if (normalized !== original) {
            fs.writeFileSync(file, normalized);
            normalizedHtmlFiles += 1;
          }
        }

        for (const file of collectFiles(distDir, (entry) => entry.endsWith('.xml'))) {
          const original = fs.readFileSync(file, 'utf-8');
          const normalized = normalizeSitemapXml(original);

          if (normalized !== original) {
            fs.writeFileSync(file, normalized);
            normalizedXmlFiles += 1;
          }
        }

        logger.info(
          `SEO URL normalization complete. HTML files updated: ${normalizedHtmlFiles}. XML files updated: ${normalizedXmlFiles}.`,
        );
      },
    },
  };
}
