import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE = 'https://pethomeeuthanasia.us';

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

function label(segment: string) {
  return segment.split('-').filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function buildBreadcrumb(pathname: string) {
  const itemListElement: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
  ];
  let currentPath = '';
  pathname.split('/').filter(Boolean).forEach((segment, index) => {
    currentPath += `/${segment}`;
    itemListElement.push({ '@type': 'ListItem', position: index + 2, name: label(segment), item: `${SITE}${currentPath}` });
  });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement };
}

export default function injectBreadcrumbSchema(): AstroIntegration {
  return {
    name: 'pethome-inject-breadcrumb-schema',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;
        for (const file of collectHtmlFiles(distDir)) {
          const relPath = path.relative(distDir, file).replace(/\\/g, '/');
          if (relPath === '404.html') continue;
          const html = fs.readFileSync(file, 'utf-8');
          const root = parse(html);
          const canonicalUrl = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
          if (!canonicalUrl || !canonicalUrl.startsWith(SITE)) continue;
          const pathname = new URL(canonicalUrl).pathname.replace(/\/$/, '') || '/';
          const data = buildBreadcrumb(pathname);
          root.querySelector('head')?.appendChild(parse(`<script type="application/ld+json">${JSON.stringify(data)}</script>`));
          fs.writeFileSync(file, root.toString());
          count += 1;
        }
        logger.info(`Breadcrumb schema injected into ${count} pages.`);
      },
    },
  };
}
