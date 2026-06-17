import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE = 'https://pethomeeuthanasia.us';
const BRAND = 'Pet Home Euthanasia Service';
const IMAGE = `${SITE}/assets/images/generated/home-hero-compassionate-care.png`;
const IMAGE_ALT = 'Compassionate in-home pet euthanasia care for dogs and cats';
const DEFAULT_DESCRIPTION = 'Compassionate in-home pet euthanasia, dog euthanasia at home, cat euthanasia at home, pet hospice guidance, and aftercare support for Southern California families.';
const PHONE = '(760) 912-0848';

function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  const walk = (currentDir: string) => {
    for (const entry of fs.readdirSync(currentDir)) {
      const entryPath = path.join(currentDir, entry);
      const stat = fs.statSync(entryPath);
      if (stat.isDirectory()) walk(entryPath);
      else if (entry.endsWith('.html')) files.push(entryPath);
    }
  };
  walk(dir);
  return files;
}

function clean(value = ''): string {
  return value.replace(/\s+/g, ' ').trim();
}

function truncate(value: string, max: number): string {
  const text = clean(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : max - 1)}…`;
}

function normalizeTitle(rawTitle: string, pathname: string): string {
  let title = clean(rawTitle)
    .replace(/Pet Home Euthanasia US/g, BRAND)
    .replace(/Pet Home Euthanasia Service Service/g, BRAND)
    .replace(/\s*\|\s*Pet Home Euthanasia\s*$/g, ` | ${BRAND}`)
    .replace(/\s*\|\s*Pet Home Euthanasia US\s*$/g, ` | ${BRAND}`);

  if (!title || title === BRAND) {
    title = pathname === '/'
      ? `In-Home Pet Euthanasia Near Me in Southern California | ${BRAND}`
      : `${BRAND}`;
  }

  if (pathname === '/') return `In-Home Pet Euthanasia Near Me in Southern California | ${BRAND}`;
  if (!title.includes(BRAND)) title = `${title} | ${BRAND}`;
  return truncate(title, 68);
}

function descriptionFor(root: ReturnType<typeof parse>, pathname: string): string {
  const existing = clean(root.querySelector('meta[name="description"]')?.getAttribute('content') || '');
  const h1 = clean(root.querySelector('h1')?.text || '');
  const lead = clean(root.querySelector('.lead')?.text || '');

  if (pathname === '/') {
    return truncate(`Compassionate in-home pet euthanasia near you in Southern California. Mobile veterinarian support for dogs and cats, hospice guidance, clear pricing, and aftercare coordination. Call ${PHONE}.`, 165);
  }

  const candidate = existing || lead || h1 || DEFAULT_DESCRIPTION;
  return truncate(candidate.replace(/Pet Home Euthanasia US/g, BRAND), 165);
}

function ensureMeta(head: ReturnType<typeof parse>, selector: string, attrs: Record<string, string>) {
  head.querySelectorAll(selector).forEach((node) => node.remove());
  const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${value.replace(/"/g, '&quot;')}"`).join(' ');
  head.appendChild(parse(`<meta ${attributes}>`));
}

function ensureLink(head: ReturnType<typeof parse>, selector: string, attrs: Record<string, string>) {
  head.querySelectorAll(selector).forEach((node) => node.remove());
  const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${value.replace(/"/g, '&quot;')}"`).join(' ');
  head.appendChild(parse(`<link ${attributes}>`));
}

export default function normalizeSeoMeta(): AstroIntegration {
  return {
    name: 'pethome-normalize-seo-meta',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;

        for (const file of collectHtmlFiles(distDir)) {
          const relPath = path.relative(distDir, file).replace(/\\/g, '/');
          if (relPath === '404.html') continue;

          const root = parse(fs.readFileSync(file, 'utf-8'));
          const head = root.querySelector('head');
          if (!head) continue;

          const canonical = head.querySelector('link[rel="canonical"]')?.getAttribute('href') || `${SITE}/${relPath.replace(/index\.html$/, '').replace(/\.html$/, '')}`.replace(/\/$/, '') || `${SITE}/`;
          const pathname = new URL(canonical).pathname.replace(/\/$/, '') || '/';
          const title = normalizeTitle(head.querySelector('title')?.text || '', pathname);
          const description = descriptionFor(root, pathname);

          head.querySelectorAll('title').forEach((node) => node.remove());
          head.insertAdjacentHTML('afterbegin', `<title>${title}</title>`);

          ensureMeta(head, 'meta[name="description"]', { name: 'description', content: description });
          ensureMeta(head, 'meta[name="robots"]', { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
          ensureMeta(head, 'meta[name="googlebot"]', { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
          ensureMeta(head, 'meta[name="application-name"]', { name: 'application-name', content: BRAND });
          ensureMeta(head, 'meta[name="apple-mobile-web-app-title"]', { name: 'apple-mobile-web-app-title', content: BRAND });
          ensureMeta(head, 'meta[name="theme-color"]', { name: 'theme-color', content: '#0f4f49' });
          ensureMeta(head, 'meta[name="format-detection"]', { name: 'format-detection', content: 'telephone=yes' });
          ensureMeta(head, 'meta[name="referrer"]', { name: 'referrer', content: 'strict-origin-when-cross-origin' });

          ensureMeta(head, 'meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
          ensureMeta(head, 'meta[property="og:type"]', { property: 'og:type', content: pathname === '/' ? 'website' : 'article' });
          ensureMeta(head, 'meta[property="og:site_name"]', { property: 'og:site_name', content: BRAND });
          ensureMeta(head, 'meta[property="og:title"]', { property: 'og:title', content: title });
          ensureMeta(head, 'meta[property="og:description"]', { property: 'og:description', content: description });
          ensureMeta(head, 'meta[property="og:url"]', { property: 'og:url', content: canonical });
          ensureMeta(head, 'meta[property="og:image"]', { property: 'og:image', content: IMAGE });
          ensureMeta(head, 'meta[property="og:image:secure_url"]', { property: 'og:image:secure_url', content: IMAGE });
          ensureMeta(head, 'meta[property="og:image:width"]', { property: 'og:image:width', content: '1672' });
          ensureMeta(head, 'meta[property="og:image:height"]', { property: 'og:image:height', content: '941' });
          ensureMeta(head, 'meta[property="og:image:alt"]', { property: 'og:image:alt', content: IMAGE_ALT });

          ensureMeta(head, 'meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
          ensureMeta(head, 'meta[name="twitter:title"]', { name: 'twitter:title', content: title });
          ensureMeta(head, 'meta[name="twitter:description"]', { name: 'twitter:description', content: description });
          ensureMeta(head, 'meta[name="twitter:image"]', { name: 'twitter:image', content: IMAGE });
          ensureMeta(head, 'meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: IMAGE_ALT });

          ensureLink(head, 'link[rel="image_src"]', { rel: 'image_src', href: IMAGE });

          fs.writeFileSync(file, root.toString());
          count += 1;
        }

        logger.info(`SEO and social meta normalized on ${count} pages.`);
      },
    },
  };
}
