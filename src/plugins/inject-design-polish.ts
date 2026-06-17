import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

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

export default function injectDesignPolish(): AstroIntegration {
  return {
    name: 'pethome-inject-design-polish',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;
        for (const file of collectHtmlFiles(distDir)) {
          const html = fs.readFileSync(file, 'utf-8');
          if (html.includes('/css/seo-layout.css')) continue;
          const root = parse(html);
          root.querySelector('head')?.appendChild(parse('<link rel="stylesheet" href="/css/seo-layout.css">'));
          const body = root.querySelector('body');
          if (body && !html.includes('mobile-cta-bar')) {
            body.appendChild(parse('<div class="mobile-cta-bar" aria-label="Quick contact actions"><a href="tel:+17609120848" class="btn btn--primary">Call</a><a href="/pricing" class="btn btn--secondary">Pricing</a></div>'));
          }
          fs.writeFileSync(file, root.toString());
          count += 1;
        }
        logger.info(`Responsive design polish injected into ${count} pages.`);
      },
    },
  };
}
