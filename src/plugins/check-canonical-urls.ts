import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE_ORIGIN = 'https://pethomeeuthanasia.us';
const HOME_CANONICAL = `${SITE_ORIGIN}/`;
const MAIN = 'https://pet' + 'homeeuthanasia' + 'service.com/';
const MAIN_LABEL = 'Official Pet Home Euthanasia Service website';

function collectHtmlFiles(dir: string): string[] {
  const htmlFiles: string[] = [];

  function walk(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir)) {
      const entryPath = path.join(currentDir, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        walk(entryPath);
      } else if (entry.endsWith('.html')) {
        htmlFiles.push(entryPath);
      }
    }
  }

  walk(dir);
  return htmlFiles;
}

function validateCanonicalUrl(href: string): string | null {
  if (!href.startsWith(SITE_ORIGIN)) {
    return `canonical must use ${SITE_ORIGIN}`;
  }

  if (href.includes('.html')) {
    return 'canonical must not contain .html';
  }

  if (href !== HOME_CANONICAL && href.endsWith('/')) {
    return 'canonical must not end with a trailing slash except homepage';
  }

  return null;
}

function applyOfficialRelationship(root: ReturnType<typeof parse>) {
  const html = root.toString();
  const bottom = root.querySelector('.site-footer__bottom');
  if (bottom && !html.includes(MAIN)) {
    bottom.appendChild(parse(`<span class="site-footer__main-site"><a href="${MAIN}" rel="noopener">${MAIN_LABEL}</a></span>`));
  }

  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    const current = script.text;
    if (!current || current.includes(MAIN)) continue;
    const updated = current.replace('"openingHours":"Mo-Su 08:00-20:00"', `"openingHours":"Mo-Su 08:00-20:00","sameAs":["${MAIN}"]`);
    if (updated !== current) script.set_content(updated);
  }
}

export default function checkCanonicalUrls(): AstroIntegration {
  return {
    name: 'pethome-check-canonical-urls',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const canonicalUrlMap = new Map<string, string>();
        let canonicalErrorsFound = false;

        for (const file of collectHtmlFiles(distDir)) {
          const content = fs.readFileSync(file, 'utf-8');
          const root = parse(content);
          const canonicalLink = root.querySelector('link[rel="canonical"]');
          const relFilePath = path.relative(distDir, file).replace(/\\/g, '/');

          if (relFilePath === '404.html') {
            continue;
          }

          if (!canonicalLink) {
            logger.error(`Missing canonical URL in: ${relFilePath}`);
            canonicalErrorsFound = true;
            continue;
          }

          const href = canonicalLink.getAttribute('href');
          if (!href) {
            logger.error(`Empty canonical URL in: ${relFilePath}`);
            canonicalErrorsFound = true;
            continue;
          }

          const validationError = validateCanonicalUrl(href);
          if (validationError) {
            logger.error(`Invalid canonical URL in ${relFilePath}: ${href} (${validationError})`);
            canonicalErrorsFound = true;
            continue;
          }

          if (canonicalUrlMap.has(href)) {
            logger.error(`Duplicate canonical URL found: ${href}`);
            logger.error(`Used in: ${canonicalUrlMap.get(href)} and ${relFilePath}`);
            canonicalErrorsFound = true;
          } else {
            canonicalUrlMap.set(href, relFilePath);
          }

          applyOfficialRelationship(root);
          fs.writeFileSync(file, root.toString());
        }

        if (canonicalErrorsFound) {
          throw new Error('Build failed: canonical URL policy violations detected.');
        }

        logger.info(`Canonical URL check passed. ${canonicalUrlMap.size} unique clean URLs verified.`);
      },
    },
  };
}
