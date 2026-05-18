import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

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

function routeVariants(distDir: string, file: string): string[] {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');

  if (rel === 'index.html') {
    return ['/', '/index.html'];
  }

  if (rel.endsWith('/index.html')) {
    const dirRoute = `/${rel.slice(0, -'index.html'.length)}`;
    return [dirRoute, dirRoute.slice(0, -1), `/${rel}`];
  }

  if (rel.endsWith('.html')) {
    return [`/${rel}`, `/${rel.slice(0, -'.html'.length)}`];
  }

  return [`/${rel}`];
}

export default function checkInternalLinks(): AstroIntegration {
  return {
    name: 'pethome-check-internal-links',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const htmlFiles = collectHtmlFiles(distDir);
        const availablePaths = new Set<string>();

        for (const file of htmlFiles) {
          for (const route of routeVariants(distDir, file)) {
            availablePaths.add(route);
          }
        }

        availablePaths.add('/sitemap.xml');
        availablePaths.add('/sitemap-index.xml');

        let brokenLinksFound = false;

        for (const file of htmlFiles) {
          const content = fs.readFileSync(file, 'utf-8');
          const root = parse(content);

          for (const link of root.querySelectorAll('a[href]')) {
            const href = link.getAttribute('href');
            if (!href) {
              continue;
            }

            if (
              href.startsWith('http') ||
              href.startsWith('mailto:') ||
              href.startsWith('tel:') ||
              href.startsWith('#')
            ) {
              continue;
            }

            let cleanHref = href.split('#')[0].split('?')[0];
            if (cleanHref.endsWith('/') && cleanHref.length > 1) {
              cleanHref = cleanHref.slice(0, -1);
            }

            if (!cleanHref.startsWith('/')) {
              cleanHref = `/${path
                .normalize(path.join(path.dirname(path.relative(distDir, file)), cleanHref))
                .replace(/\\/g, '/')}`;
            }

            if (!availablePaths.has(cleanHref)) {
              logger.error(`Broken internal link found: ${href} in ${path.relative(distDir, file)}`);
              brokenLinksFound = true;
            }
          }
        }

        if (brokenLinksFound) {
          throw new Error('Build failed: broken internal links detected.');
        }

        logger.info('Internal link check passed successfully.');
      },
    },
  };
}
