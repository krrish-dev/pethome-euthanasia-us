import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const homeLinks = [
  ['/services/in-home-pet-euthanasia', 'In-home pet euthanasia'],
  ['/services/dog-euthanasia-at-home', 'Dog euthanasia at home'],
  ['/services/cat-euthanasia-at-home', 'Cat euthanasia at home'],
  ['/services/same-day-pet-euthanasia', 'Same-day help'],
  ['/resources/quality-of-life-scale', 'Quality of life scale'],
  ['/resources/what-to-expect-during-in-home-pet-euthanasia', 'What to expect'],
];

const footerLinks = [
  ['/services/mobile-pet-euthanasia', 'Mobile pet euthanasia'],
  ['/services/pet-hospice-care', 'Pet hospice care'],
  ['/services/pet-cremation-aftercare', 'Aftercare options'],
  ['/resources/how-to-know-when-it-is-time', 'When is it time?'],
  ['/resources/private-vs-communal-pet-cremation', 'Cremation guide'],
  ['/reviews', 'Reviews'],
];

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

function linkList(links: string[][]) {
  return links.map(([href, text]) => `<a href="${href}">${text}</a>`).join('');
}

export default function injectInternalLinking(): AstroIntegration {
  return {
    name: 'pethome-inject-internal-linking',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;

        const home = path.join(distDir, 'index.html');
        if (fs.existsSync(home)) {
          let html = fs.readFileSync(home, 'utf-8');
          if (!html.includes('home-seo-link-grid')) {
            const block = `<section class="section" id="popular-guides"><div class="container"><h2 class="section-heading">Popular care guides</h2><p class="lead">Fast paths to the pages families use most when comparing home care, timing, and aftercare.</p><div class="home-seo-link-grid">${linkList(homeLinks)}</div></div></section><style>.home-seo-link-grid{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1rem}.home-seo-link-grid a{padding:.7rem 1rem;border:1px solid var(--color-primary-200);border-radius:var(--radius-md);background:var(--color-surface-raised);color:var(--color-primary-700);text-decoration:none}</style>`;
            html = html.replace('</main>', `${block}</main>`);
            fs.writeFileSync(home, html);
            count += 1;
          }
        }

        for (const file of collectHtmlFiles(distDir)) {
          let html = fs.readFileSync(file, 'utf-8');
          if (html.includes('footer-seo-links')) continue;
          const block = `<div class="footer-seo-links" style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap;">${linkList(footerLinks)}</div>`;
          if (html.includes('</footer>')) {
            html = html.replace('</footer>', `${block}</footer>`);
            fs.writeFileSync(file, html);
            count += 1;
          }
        }
        logger.info(`Internal linking enhanced on ${count} pages.`);
      },
    },
  };
}
