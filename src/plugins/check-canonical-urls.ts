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

export default function checkCanonicalUrls(): AstroIntegration {
  return {
    name: 'pethome-check-canonical-urls',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const canonicalUrlMap = new Map<string, string>();
        let duplicatesFound = false;

        for (const file of collectHtmlFiles(distDir)) {
          const content = fs.readFileSync(file, 'utf-8');
          const root = parse(content);
          const canonicalLink = root.querySelector('link[rel="canonical"]');
          const relFilePath = path.relative(distDir, file).replace(/\\/g, '/');

          if (!canonicalLink) {
            logger.warn(`Missing canonical URL in: ${relFilePath}`);
            continue;
          }

          const href = canonicalLink.getAttribute('href');
          if (!href) {
            logger.warn(`Empty canonical URL in: ${relFilePath}`);
            continue;
          }

          if (canonicalUrlMap.has(href)) {
            logger.error(`Duplicate canonical URL found: ${href}`);
            logger.error(`Used in: ${canonicalUrlMap.get(href)} and ${relFilePath}`);
            duplicatesFound = true;
          } else {
            canonicalUrlMap.set(href, relFilePath);
          }
        }

        if (duplicatesFound) {
          throw new Error('Build failed: duplicate canonical URLs detected.');
        }

        logger.info(`Canonical URL check passed. ${canonicalUrlMap.size} unique URLs verified.`);
      },
    },
  };
}
